define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'text!templates/cart/receipt.html',
], function($, _, backbone, modelBinder, receiptHtml){

  var receiptView = Backbone.View.extend({

    initialize: function(id, code) {
        this.template = _.template(receiptHtml);
        this.emptyCart();
        this.id = id;
        this.code = code;
    },

    render : function () {
      this.$el.html(this.template({id:this.id, code:this.code}));
      return this.el;
    },

    postRender : function() {
      if (app.cartItemList.containsPackage() === true){
        $("#app-code").show();
      }
    },


    // empty cart as it bought and paid for
    emptyCart: function() {
      var list = app.cartItemList;

      list.each(function(m){
        list.pop();
      })
    },

    getTitle : function(){
      return "Receipt of Order";
    }


  });

  return receiptView;
});

