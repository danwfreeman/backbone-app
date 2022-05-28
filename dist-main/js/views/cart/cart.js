define([
  'jquery',
  'underscore',
  'backbone',
  'views/cart/cart-item',
  'text!templates/cart/cart.html'
], function($, _, backbone, CartItemView, cartHtml){

  var cartView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(cartHtml);
        _.bindAll(this, 'clearSuccessCallback', 'clearErrorCallback');
    },

    render: function(eventName) {
      this.$el.html(this.template());

      for (var i=0;i<this.collection.models.length;i++) {
        this.renderCartItem(this.collection.models[i], i);
      }
      return this.el;
    },


    postRender : function() {
      this.$('.inner').ajaxStart(app.utils.showGlobalLoader).ajaxStop(app.utils.hideGlobalLoader);
    },


    updateTotals : function() {
      this.collection.updateTotals();
    },

    events : {
      "click #checkout" : "checkout",
      "click #clear-cart" : "clearCart",
      "click #continue" : "continueShopping",
    },

    renderCartItem : function (cartItem, i) {
      var total = Math.round(cartItem.get('quantity')*cartItem.get('price')*100)/100;
      total = app.utils.padDecimal(total);

      cartItem.set({total:total}, {silent: true});
      var view = new CartItemView({
          model : cartItem
        });
      this.$("#cart-list").append(view.render().el);
    },

    checkout : function(ev) {
      ev.preventDefault();

      // validate all models before continuing
      var models = this.collection.models; // direct access to this collection's models
      if (models.length == null || models.length == 0){
        app.showError('You must have at least one item in your cart to continue');
        return;
      }

      var isValid = true;

      for (var i=0;i<models.length;i++) {
        models[i].validate();
        if (models[i].isValid() === false) isValid = false;
      }

      if (isValid === false) return;
      app.navigate("checkout", true);
    },

    clearCart : function(ev) {
      ev.preventDefault();
      this.collection.sync("delete", this.collections, {success:this.clearSuccessCallback, error:this.clearErrorCallback, wait:true});
    },


    clearSuccessCallback : function(model, response, options){
       var list = this.collection;
       list.each(function(m){
          list.pop();
       })
       this.render();
       window.scrollTo(0, 0);
       app.utils.hideGlobalLoader();
       app.showMessage("Cart items were cleared");
    },

    clearErrorCallback : function(model, response, options){
      console.log("unable to clear cart items");
      app.utils.hideGlobalLoader();
      app.showMessage("Not able to clear your cart at this time");
    },

    continueShopping : function (ev) {
      app.navigate("home", true);
    },


    getTitle : function(){
      return "Your Shopping Cart";
    }

  });

  return cartView;
});