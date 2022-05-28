define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/stock-car/details.html',
], function($, _, backbone, detailsHtml){

  var detailsView = Backbone.View.extend({

    initialize: function(itemNumber) {
        this.item = app.catalog.getItemById(itemNumber);
        this.template = _.template(detailsHtml);
    },

    render : function () {
      this.$el.html(this.template(this.item));
      return this.el;
    },

    postRender : function() {
      if (this.item.itemNumber === 'B10'){
        $('#product-image').attr('src', '../images/mobile/home/fx_bundle_mp.jpg');
      }
    },

    getTitle : function() {
      if (this.item.itemNumber === "B10"){
        return "FX Complete Package";
      } else {
        return "FX Car";
      }

    },

    events : {
      "click .cart-button #cart-button" : "addToCart",
      "click #product-image" : "addToCart",
      "click .iphone-toggle" : "togglePhoneSize"
    },

    addToCart : function() {
      window.scrollTo(0, 0);
      if (this.item.itemNumber === 'C2' || this.item.itemNumber === 'B11'){
        alert("Please be aware that due to popular demand the FX Car for iPhone/iPod 5 (S/C) is currently on back order.  Please expect a 3-4 week delay, we apologize for the inconvenience.")
      }
      app.cartItemList.addItem(this.item);
    },

    togglePhoneSize : function(ev){
      if (this.item.itemNumber === "B10"){
        this.item = app.catalog.getItemById("B11");
      } else if (this.item.itemNumber === "B11"){
        this.item = app.catalog.getItemById("B10");
      } else if  (this.item.itemNumber === "C1"){
        this.item = app.catalog.getItemById("C2");
      } else if  (this.item.itemNumber === "C2"){
        this.item = app.catalog.getItemById("C1");
      }
    }


  });

  return detailsView;
});

