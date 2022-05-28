define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tape/details.html',
], function($, _, backbone, detailsHtml){

  var detailsView = Backbone.View.extend({

    initialize: function(itemName) {
        this.template = _.template(detailsHtml);
        this.name = itemName;
        this.selectedItemNumbers = [];
    },

    render : function () {
      var data = {};
      var bundle;
      if (this.name === "tape"){
        data.name = "Multi-colored Tape";
        data.thumbnail = "tape_bundle";
        bundle = app.catalog.getItemById("B15")
      }
//      else if (this.name === "postcard") {
//        data.name = "High gloss postcards";
//        data.thumbnail = "postcard";
//        bundle = app.catalog.getItemById("B15")
//      }


      var products = app.catalog.getProductsByCategory(this.name);
      data.products = products;
      data.bundle = bundle;

      this.$el.html(this.template(data));
      return this.el;
    },

    postRender : function() {
      var tape = '<li>Build interactive tracks with multi colored tape</li><li>Price: $1.50 each</li>';
//      var postCard = '<li>Establish buildings and popular landmarks with these common templates</li><li>Price: $1.50 each</li>' +
//        '<li>also available at <a href="http://www.redbubble.com/" target="_blank">redbubble.com</a></li>';

      var list = this.$(".fx-description-list");
//      if (this.name === 'postcard'){
//        list.append(postCard);
//      } else
      if (this.name === 'tape'){
        list.append(tape);
      }


    },

    getTitle : function(){
      return "FX Track";
    },

    events : {
      "click .cart-button #cart-button" : "addToCart",
      "click .cart-item-type li input" : "toggleCheckbox",
      "click .cart-item-type li a" : "showPopupImage",
      "click #pop-up" : "doPopupClose"
    },

    addToCart : function() {
      window.scrollTo(0, 0);
      var items = [];
      for (var i=0; i<this.selectedItemNumbers.length; i++){
        items.push(app.catalog.getItemById(this.selectedItemNumbers[i]));
      }
      app.cartItemList.addItems(items);
    },

    toggleCheckbox : function(ev){
      var itemNumber = ev.currentTarget.className;

      var box = this.$('input.'+itemNumber);


     // if (itemNumber === 'B14' || itemNumber === 'B15') {
      if (itemNumber === 'B15') {
        this.selectedItemNumbers = [];
        var isChecked = box.attr('checked') === 'checked';

        if (isChecked === true){
          this.selectedItemNumbers.push(itemNumber);
        }
        this.disableCheckboxes(isChecked);
        return;
      }

      if (box.attr('checked') === 'checked'){
        this.selectedItemNumbers.push(itemNumber);
      } else {
        this.selectedItemNumbers = _.without(this.selectedItemNumbers, itemNumber);
      }
    },

    disableCheckboxes : function(isDisabled) {
      var products = app.catalog.getProductsByCategory(this.name);

      for (var i=0;i<products.length;i++){
        this.$('input.'+products[i].itemNumber).attr('disabled', isDisabled);
        this.$('input.'+products[i].itemNumber).attr('checked', false);
      }
    },

    showPopupImage : function(ev){
      var itemNumber = ev.currentTarget.className;
      var item = app.catalog.getItemById(itemNumber);

      var src = "../images/thumbs/"+item.thumbnail+".png"
      this.$('#pop-up img').attr("src", src);
      this.$('#pop-up img').attr("alt", item.itemName);
      $('#cart-item-details div#pop-up').show();
    },

    doPopupClose : function(){
      $('#cart-item-details div#pop-up').hide();
    }

  });

  return detailsView;
});

