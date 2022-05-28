define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  '../../views/cart/review-cart-item',
  '../../views/cart/address',
  'text!templates/cart/review-cart.html',
], function($, _, backbone, modelBinder, ReviewCartItemView, AddressView, reviewCartHtml){

  var reviewCartView = Backbone.View.extend({

    initialize: function() {
        this.binder = new modelBinder();
        this.cartList = app.cartItemList;
        this.userInfoList = app.userInfoList;
        this.template = _.template(reviewCartHtml);


        var CouponModel = Backbone.Model.extend({

           validation: {
              couponCode: {
                required: true
              }
            },
            labels: {
              couponCode : "Coupon Code"
            }
        })

        this.model = new CouponModel();
    },

    render: function(eventName) {
      this.$el.html(this.template());
      this.binder.bind(this.model, this.el);

      for (var i=0;i<this.cartList.length;i++) {
        this.renderCartItem(this.cartList.at(i), i);
      }

      // rework to have server return R S B respectively - rather than mocking up fake UI objects here

      var shipping = this.userInfoList.where({type:this.userInfoList.model.SHIPPING})[0];
      var billing = this.userInfoList.where({type:this.userInfoList.model.BILLING})[0];

      this.renderUserInfoItem(shipping);
      this.renderUserInfoItem(billing);

      return this.el;
    },

    postRender: function(){
//      $("#review-order img#checkmark").hide();
//      if (app.appliedCouponCode != null){
//        this.renderAppliedCoupon(app.appliedCouponCode);
//      }
      this.updateTotals();
    },

    updateTotals : function() {
      this.cartList.updateTotals();
    },

    events : {
      "click #edit-cart-button" : "editCart",
      "click #edit-shipping-button" : "editShipping",
      "click #edit-billing-button" : "editBilling",
      "click #coupon-code-button" : "validateCoupon",
      "click #continue-button" : "doContinue"
    },


    validateCoupon : function(ev) {
      ev.preventDefault();
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

//      if (app.appliedCouponCode != null){
//        return; // don't validate again
//      }

      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true });
      this.model.validate();
      var isValid = this.model.isValid();

      if (isValid === false) return;

      var view = this;
      var code = $('#coupon-code').val();

      app.utils.setAjaxLoading(ev.currentTarget);
      $.ajax({
          type: "GET",
          url: "rest/txn/coupon/"+code
          }).done(function( data ) {
              app.utils.unsetAjaxLoading(ev.currentTarget);
              view.applyCoupon(code, data);
            }).error(function(msg){
              app.utils.unsetAjaxLoading(ev.currentTarget);
              app.utils.invalid(view, 'couponCode', "Coupon Code not recognized", "name");
              $("#review-order .form-area input").css("width", "");
              //$("#review-order img#checkmark").hide();
              //$("#review-order .form-area input").attr('disabled', false);  // shouldn't get to this point
            });
    },

    renderAppliedCoupon : function(code){
        //if (app.appMode === 'mobile'){
          //$("#review-order .form-area input").css("width", "249");
          //$("#review-order img#checkmark").show();
          //$("#review-order .form-area input").attr('disabled', 'disabled');
          //$("#review-order .form-area input").val(code);
        //} //else {  // desktop mode
          //$("#coupon-code").attr('disabled', 'disabled');
          //$("#coupon-code-button").addClass('disabled');
        //}
    },


    // *** must match logic on server to apply discount to correct item or items!! ***
    applyCoupon : function(code, data) {
      var isApplied = false;

      for (var i=0;i<this.cartList.length;i++) {
        var item = this.cartList.at(i);

        // if cart item matches valid coupons returned then apply discount
        for (var j=0;j<data.length; j++){
          if (data[j].itemNumber === item.get('itemNumber')){
            item.set('price', data[j].price);
            item.set('discounted', true);
            isApplied = true;
          }
        }
      }

      if (isApplied === false) {
        app.showMessage("Sorry, no eligible items for this coupon code.");
        window.scrollTo(0, 0);
        return;
      }

      //app.appliedCouponCode = code;
      this.render(); // show discount item
      this.postRender();  // disable coupon text box
      app.showMessage("Discount applied!");
      window.scrollTo(0, 0);
    },

    renderCartItem : function (cartItem, i) {
      var total = Math.round(cartItem.get('quantity')*cartItem.get('price')*100)/100;
      total = app.utils.padDecimal(total);
      cartItem.set({total:total},{silent: true});

      var view = new ReviewCartItemView({
          model : cartItem
        });
      this.$("#review-cart-list").append(view.render().el);
    },

    renderUserInfoItem : function (address) {
     var view = new AddressView({model : address});

     if (address.get('type') == this.userInfoList.model.SHIPPING) {
        this.$(".shipping").prepend(view.render().el);
     } else if (address.get('type') == this.userInfoList.model.BILLING) {
        this.$(".billing").prepend(view.render().el);
     }

    },

    editShipping: function(ev) {
      ev.preventDefault();
      app.navigate("shipping", true);
    },

    editBilling: function(ev) {
      ev.preventDefault();
      app.navigate("billing", true);
    },

    editCart: function(ev) {
      ev.preventDefault();
      app.navigate("cart", true);
    },

    doContinue : function(ev) {
      ev.preventDefault();
      app.navigate("payment", true);
    },


    getTitle : function(){
      return "Review Order";
    }

  });

  return reviewCartView;
});