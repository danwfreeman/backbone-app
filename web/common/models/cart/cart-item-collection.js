define(
['jquery', 'underscore', 'backbone', '../../models/cart/cart-item-model'],

function($, _, Backbone, CartItem) {

	var CartItemCollection = Backbone.Collection.extend({
		model: CartItem,
		url: "rest/cart/",
    handling : 0, // set from server call on item updates, todo: calc handling from server call

    initialize : function (models, opts) {
      _.bindAll(this, 'addSuccessCallback', 'addErrorCallback', 'addMultipleSuccessCallback');
      this.on('change:total', this.updateTotals);
      this.on('add', this.updateTotals);
      this.on('remove', this.updateTotals);
      this.on('reset', this.updateTotals);
    },

    sync: function(method, model, options) {
      options.url = 'rest/cart/items/';
      Backbone.sync(method, model, options);
    },


    setHandling : function(){
      if (this.containsFreeShippingItemsOnly() === true){
        this.handling = app.catalog.getPriceById('SH01');  // get price for stickers only - currently free
      } else {
        this.handling = this.calcHandling();  // we need the zip code to calculate this properly
      }
    },

    // if logged in, calc based on zip, otherwise set to -1
    // to flag to not show until zip entered
    calcHandling : function(){
        if (app.userInfoList == null ||  app.userInfoList.length === 0){
          return -1;
        }

        // get shipping
        var shipTo = app.userInfoList.where({type:app.userInfoList.model.SHIPPING})[0];
        if (shipTo == null){
          shipTo = app.userInfoList.where({type:app.userInfoList.model.REGISTRATION})[0];
        }
        var zip = shipTo.get("postal");
        var isMultipleCars = this.isMultipleCars();
        var price = app.zones.getPriceForZip(zip, isMultipleCars);
        return price;
    },


    containsFreeShippingItemsOnly: function(){
      var freeItemCodes = ['S10', 'S11', 'S12', 'S13', 'B10', 'B11', 'B13'];  // stickers, sticker bundle and complete package
      var contains = true;


      this.each(function (item) {
        var itemNum = item.get('itemNumber');
        if ($.inArray(itemNum, freeItemCodes) === -1) {
          contains = false;
        }
      });

      return contains;
    },

    containsPackage : function() {
     var packageCodes = ['B10', 'B11']
     var contains = false;

      this.each(function (item) {
        var itemNum = item.get('itemNumber');
        if ($.inArray(itemNum, packageCodes) !== -1) {
          contains = true;
        }
      });

      return contains;
    },

    isMultipleCars : function () {
      var count = 0;
      var carCodes = ['B10', 'B13', 'C1'];

      this.each(function (item) {
        var itemNum = item.get('itemNumber');
        if ($.inArray(itemNum, carCodes) >= 0) {
          count = count + item.get('quantity');
        }
      });

      if (count > 1){
        return true;
      }
      return false;

    },

    // grand total for entire cart
    updateTotals : function () {
      var total = this.getTotal();

      this.setHandling();

      var grand = this.getGrandTotal();
      grand = app.utils.padDecimal(grand);
      total = app.utils.padDecimal(total);

      $('.cost-total .sum').html('$' + total);

      if (this.handling === -1){
        $('#handling .fx-label.handling').html("HANDLING  &nbsp;&nbsp;&nbsp; (calculating)");
      } else{
        $('.cost-handling .sum').html('$' + this.handling);
      }

      $('.grand-total .sum').html('$' + grand);
      $('#header .sum').html(this.getItemCount());
      $('#header .header-total').html('$' + grand);
    },

    getItemCount : function () {
      var count = 0;

      this.each(function (item) {
        var quantity = item.get('quantity');
        if (isNaN(quantity) === false) {
          count = count + quantity;
        }
     });
     return count;

    },

    getTotal : function() {
      var total = 0;

      this.each(function (item) {
        var str_price = item.get('price');
        var quantity = item.get('quantity');
        var t = parseFloat(str_price) * quantity;
        total = total + t;
     });

      return Math.round(total*100)/100;
    },

    getGrandTotal : function(){
      var total = this.getTotal();
      var str_handling = this.handling;
      if (str_handling === -1){
        str_handling = "0";
      }

      var grand = parseFloat(str_handling) + total;
      return  Math.round(grand*100)/100;
    },

    // todo: iterate over the collection adding the quantity for each item
    updateHeaderTotal : function() {
      $('#header .sum').html(this.size());
    },


    // todo, rework to add a list on the server, check for dups first, for now add one at a time
    addItems : function (cartItems) {
      if (cartItems.length === 1){
        this.addItem(cartItems[0]);
        return;
      }

      var warnings = [];

      for (var i=0; i<cartItems.length; i++){
        var cartItem = cartItems[i];
        var item = this.where({itemNumber:cartItem['itemNumber']});
        var cartCollectionInstance = this;

        if (item != null && item.length > 0){
          warnings.push(item[0].get('itemNumber'));  // todo, show on page somehow
        } else {
            var itemModel = new CartItem();
            itemModel.save(cartItem, {success:this.addMultipleSuccessCallback, error:this.addErrorCallback, wait:true, silent: true } );
        }
      }



    },

    // add a single item, specified via function params
    // this would be called externally - from a view
    addItem : function (cartItem) {
      var item = this.where({itemNumber:cartItem['itemNumber']});

      if (item != null && item.length > 0){
        app.showWarning("'"+item[0].get('itemName')+"' is already in your cart")
      } else {
          var itemModel = new CartItem();
          itemModel.save(cartItem, {success:this.addSuccessCallback, error:this.addErrorCallback, wait:true, silent: true } );
      }
    },

    addMultipleSuccessCallback : function (model, response, options) {
      app.showMessage("Multiple items have been added to your cart");
      this.add(model);
    },

    addSuccessCallback : function(model, response, options){
      app.showMessage("'"+model.get('itemName')+"' has been added to your cart.");
      this.add(model);
    },

    addErrorCallback : function(model, response, options){
      app.showError("Can not add to cart at this time, sorry for the inconvenience.")
      app.utils.hideGlobalLoader(); // in case something badly goes wrong
    },


	});

	return CartItemCollection;
});