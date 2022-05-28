define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/cart/cart-item.html'
], function($, _, backbone, cartItemHtml){

  var cartItemView = Backbone.View.extend({

    tagName : 'div',
    className : 'cart-item fx-label',


    initialize: function() {
        this.template = _.template(cartItemHtml);
        _.bindAll(this, 'updateSuccessCallback', 'updateErrorCallback', 'deleteSuccessCallback', 'deleteErrorCallback');
    },

    events : {
      "click .form-area .update-button" : "updateQuantity",
      "click .remove-item" : "removeItem",
    },

    updateQuantity : function () {
      var previous = this.model.get('quantity');
      var q = this.$('.form-area input').val();

      if (previous == q) return; // no-op, nothing changed

      this.model.set({quantity : q});
      if (this.model.isValid() === false) {
        this.model.set({quantity : 0});
        this.$('input[type="text"]').val('');  // clear it out so return view doesn't keep it around
        return;
      }

        this.model.save(this.model, {success:this.updateSuccessCallback, error:this.updateErrorCallback});
    },

    updateSuccessCallback : function(model, response, options){
        this.model = model;
        this.model.updateTotal();
        this.render();
    },

    updateErrorCallback : function(model, xhr, options) {
      console.log("update quantity failed");
      app.showError("Could not update quantity at this time.");
    },

    removeItem : function () {
        this.model.destroy({success:this.deleteSuccessCallback, error:this.deleteErrorCallback, wait:true});
    },


    deleteSuccessCallback : function(model, response, options){
      this.remove(); // remove this line item view
    },

    deleteErrorCallback : function(model, response, options){
      console.log("unable to delete cart item");
      app.showError("Could not delete cart item at this time.");
    },


    render : function () {
      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true });
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return cartItemView;
});

