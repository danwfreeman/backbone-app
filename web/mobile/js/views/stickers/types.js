define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/stickers/types.html',
], function($, _, backbone, typesHtml){

  var typesView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(typesHtml);
        this.bundle = app.catalog.getItemById('B13');

    },

    events : {
      "click .cart-item-type .title-area .details-button" : "doDetailsClick",
      "click .cart-item-type.ribbon" : "doRibbonClick",
    },


    render : function () {
      this.$el.html(this.template({price:this.bundle.price}));
      return this.el;
    },


    doDetailsClick : function (ev) {
        var id = this.$(ev.target).attr('item');
        app.navigate("stickerDetails/"+id, true);
    },

    doRibbonClick : function (ev) {
      window.scrollTo(0, 0);
      app.cartItemList.addItem(this.bundle);
    },

    getTitle : function(){
      return "FX Stickers";
    }


  });

  return typesView;
});

