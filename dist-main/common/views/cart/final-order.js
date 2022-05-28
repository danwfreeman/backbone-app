define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  '../../views/cart/address',
  '../../views/cart/final-cart-item',
  'text!templates/cart/final-order.html',
], function($, _, backbone, modelBinder, AddressView, FinalCartItemView, finalOrderHtml){

  var finalOrderView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, 'purchaseSuccessCallback', 'purchaseErrorCallback');
        this.binder = new modelBinder();
        this.template = _.template(finalOrderHtml);

        var OrderModel = Backbone.Model.extend({

          urlRoot: "rest/txn/final/"
        })

        this.model = new OrderModel();



        var total = app.utils.padDecimal(app.cartItemList.getTotal());
        var grand = app.utils.padDecimal(app.cartItemList.getGrandTotal());

        this.model.set('handling', app.cartItemList.handling);
        this.model.set('total', total);
        this.model.set('grandTotal', grand);
    },

    render: function(eventName) {

      this.$el.html(this.template(this.model.toJSON()));
      this.binder.bind(this.model, this.el);

      var shipping = app.userInfoList.where({type:app.userInfoList.model.SHIPPING})[0];
      var billing = app.userInfoList.where({type:app.userInfoList.model.BILLING})[0];


      this.renderUserInfoItem(shipping, 'shipping');
      this.renderUserInfoItem(billing, 'billing');

      for (var i=0;i<app.cartItemList.length;i++) {
        this.renderReviewCartItem(app.cartItemList.at(i));
      }

      return this.el;
    },

    postRender : function() {
      var handling = app.cartItemList.handling;
      if (handling === -1){
         $('#final-order .final-cart-items-handling .fx-text span').html("(calculating)");  // todo: make sure server calcs for this page
      }

    },


    renderUserInfoItem : function (address, clazz) {
      var view = new AddressView({model : address});
      this.$("."+clazz+"").prepend(view.render().el);
    },

    renderReviewCartItem : function (cartItem) {
      var total = Math.round(cartItem.get('quantity')*cartItem.get('price')*100)/100;
      total = app.utils.padDecimal(total);
      cartItem.set({total:total},{silent: true});

      var view = new FinalCartItemView({
          model : cartItem
        });
      this.$(".final-cart-items").append(view.render().el);
    },


    events : {
      "click #purchase" : "doPurchase"
    },


    doPurchase : function(ev) {
      ev.preventDefault();
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

      var cartList = app.cartItemList;
      var paymentInfo = app.paymentInfo;
      var userInfoList = app.userInfoList;


      this.model.set("cartDataList", cartList);
      this.model.set("paymentData", paymentInfo);
      this.model.set("userInfoDataList", userInfoList);
      if (app.appliedCouponCode != null){
        this.model.set("couponCode", app.appliedCouponCode);
      }

      app.utils.setAjaxLoading(ev.currentTarget);
      this.model.save(this.model, {success:this.purchaseSuccessCallback, error:this.purchaseErrorCallback});

    },

    // tracking num and purchase conf num
    purchaseSuccessCallback : function(model, response, options) {
      app.utils.unsetAjaxLoading($("#purchase"));

      // check for paypal error code, route to payment page and show errors
      // if they exist
      // otherwise, route to receipt page

      if (model.get("payPalErrorCode") != null && (model.get("payPalErrorCode") == "Success" || model.get("payPalErrorCode") == "SuccessWithWarning")){
        var invoiceNumber = model.get('invoiceNumber');
        var itunesCode = model.get('itunesCode');
        if (invoiceNumber != null && invoiceNumber != ""){
          app.navigate("receipt/"+invoiceNumber+"/"+itunesCode, true);
        } else {
          app.navigate("receipt", true);
        }
      } else {
        app.paypalErrorList = model.get("payPalErrorList");
        app.navigate("payment/errors", true);
      }



    },

    purchaseErrorCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($("#purchase"));
      app.showError("Sorry an error has occurred during processing of your transaction.  Please use the Contact Us form and we'll contact you immediately");
    },


    getTitle : function(){
      return "Final Order Confirmation";
    }

  });

  return finalOrderView;
});