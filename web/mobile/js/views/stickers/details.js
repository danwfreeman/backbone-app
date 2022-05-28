define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/stickers/details.html',
], function($, _, backbone, detailsHtml){

  var detailsView = Backbone.View.extend({

    initialize: function(itemNumber) {
        this.item = app.catalog.getItemById(itemNumber);
        this.template = _.template(detailsHtml);
        this.bundle = app.catalog.getItemById('B13');

    },

    setPageDetails : function (itemNum) {
      var name = app.utils.getStickerPDFName(itemNum);
      var description = app.utils.getStickerDescription(itemNum);

      $('.spec-sheet a.pdf-link').attr('href', '../pdf/'+name);
      $('.fx-description-list').html(description);
    },

    render : function () {
      this.$el.html(this.template(this.item));
      return this.el;
    },

    postRender : function() {
        this.setPageDetails(this.item.itemNumber);
        // set bundle price
        $('#bundle-price').text(this.bundle.price);
        // set image
        var imageName = this.item.thumbnail.replace('-ct','');  // assume naming convention
        $('.image img').attr('src', '../images/stickers/'+imageName+'.png');
    },

    getTitle : function(){
      return "FX Stickers Details";
    },

    events : {
      "click .cart-button #cart-button" : "addToCart",
      "click .image img" : "addToCart",
      "click #stickers-details .ribbon" : "addBundleToCart"
    },

    addToCart : function() {
      window.scrollTo(0, 0);
      app.cartItemList.addItem(this.item);
    },

    addBundleToCart : function() {
      window.scrollTo(0, 0);
      app.cartItemList.addItem(this.bundle);
    }



  });

  return detailsView;
});

