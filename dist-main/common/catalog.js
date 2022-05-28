define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, backbone){

  var catalog = {

    itemList : [],


    getItemById : function(id) {
      for (var i=0;i<this.itemList.length;i++){
        if(this.itemList[i]['itemNumber'] == id) {
          var itemCopy = {};
          $.extend(itemCopy, this.itemList[i]);
          itemCopy.quantity = 1;
          return itemCopy;
        }
      }
      return null;
    },

    getPriceById : function(id){
      var item = this.getItemById(id);
      return item.price;
    },

    getProductsByCategory : function(name) {
      var id;
      if (name === "tape"){
        id = "T";
      } else if (name === "postcard") {
        id = "P";
      }

      var products = [];

      for (var i=0;i<this.itemList.length;i++){
        if (this.itemList[i]['itemNumber'].charAt(0) === id) {
          products.push(this.itemList[i]);
        }
      }
      return products;
    },


    isCouponItem : function(id){
      var item = this.getItemById(id);
      if (item['couponPrice'] != null){
        return true;
      }
      return false;
    },

    getCouponPrice : function(id){
      if (this.isCouponItem(id) === true) {
        return this.getItemById(id)['couponPrice'];
      }
      return null;
    }



  };

  return catalog;

});

