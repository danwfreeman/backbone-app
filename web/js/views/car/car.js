define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/car/car.html'
], function($, _, backbone, carHtml){

  var carView = Backbone.View.extend({

    initialize: function(showPackage) {
        this.template = _.template(carHtml);
				this.single = app.catalog.getItemById('C1');
				this.package = app.catalog.getItemById('B10');
				this.showPackage = showPackage;

    },

    events : {
      "click .single #single-add" : "addSingleToCart",
      "click .package #package-add" : "addPackageToCart",
      "click .single .iphone-toggle input[type='checkbox']" : "toggleSingleCar",
      "click .package .iphone-toggle input[type='checkbox']" : "togglePackageCar",
      "click #pop-up .close" : "hideBackOrderWarning"
    },

    addSingleToCart : function(ev){
      ev.preventDefault();
      this.hideBackOrderWarning();
      this.addToCart(this.single);
    },

    addPackageToCart : function(ev){
      ev.preventDefault();
      this.hideBackOrderWarning();
      this.addToCart(this.package);
    },

    toggleSingleCar : function (ev) {
      this.hideBackOrderWarning();
      if($(ev.target).attr('checked') === 'checked'){
        this.single = app.catalog.getItemById('C2');
      } else {
        this.single = app.catalog.getItemById('C1');
      }

		  this.setItemNames();
    },

    togglePackageCar : function (ev) {
      this.hideBackOrderWarning();
      if($(ev.target).attr('checked') === 'checked'){
        this.package = app.catalog.getItemById('B11');
      } else {
        this.package = app.catalog.getItemById('B10');
      }

      this.setItemNames();
    },

    addToCart : function(item){
      window.scrollTo(0, 0);
      app.cartItemList.addItem(item);
      if (item.itemNumber === 'C2' || item.itemNumber === 'B11'){
        this.showBackOrderWarning();
      }
    },

    showBackOrderWarning : function(){
      $('#purchase-car div#pop-up').show();
    },

    hideBackOrderWarning : function(ev){
      $('#purchase-car div#pop-up').hide();
    },


    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    postRender : function() {
        this.$('.inner').ajaxStart(app.utils.showGlobalLoader).ajaxStop(app.utils.hideGlobalLoader);
				$(".photosgallery-vertical").sliderkit({
					circular:false,
					mousewheel:false,
					shownavitems:2,
					verticalnav:true,
					navclipcenter:true,
					auto:false
				});

        this.setItemNames();
        $('.stock_add.single span.price').text(this.single.price);
        $('.stock_add.package span.price').text(this.package.price);


    },

    setItemNames : function (){
        $('.stock_add.single span.title').text(this.single.itemName);
        $('.stock_add.package span.title').text(this.package.itemName);
    }


  });

  return carView;
});

