define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/stickers/stickers.html'
], function($, _, backbone, stickersHtml){

  var stickersView = Backbone.View.extend({

    initialize: function() {
        var $this = this;
        this.template = _.template(stickersHtml);

    },



    events: {
      "click #stickers .menu li#appfx a" : "appFXLogoClick",
      "click #stickers .menu li#dclabs a" : "dcLabsLogoClick",
      "click #stickers .menu li#cop a" : "copClick",
      "click #stickers .menu li#patrol a" : "patrolClick",
      "click #stickers .appfx input" : "appfxCartClick",
      "click #stickers .dclabs input" : "dclabsCartClick",
      "click #stickers .cop input" : "copCartClick",
      "click #stickers .patrol input" : "patrolCartClick",
      "click #stickers .sticker-bundle" : "stickerBundleClick",
      "click #stickers #sticker-top" : "scrollStickerTop",
    },


    appFXLogoClick : function(ev){
      ev.preventDefault();
      this.activate("S10", "appfx");
      var name = app.utils.getStickerPDFName("S10");
      $('ul.pdf a.pdf-link').attr('href', '../pdf/' + name);
    },

    dcLabsLogoClick : function(ev){
      ev.preventDefault();
      this.activate("S11", "dclabs");
      var name = app.utils.getStickerPDFName("S11");
      $('ul.pdf a.pdf-link').attr('href', '../pdf/' + name);

    },

    copClick : function(ev){
      ev.preventDefault();
      this.activate("S12", "cop");
      var name = app.utils.getStickerPDFName("S12");
      $('ul.pdf a.pdf-link').attr('href', '../pdf/' + name);
    },

    patrolClick : function(ev){
      ev.preventDefault();
      this.activate("S13", "patrol");
      var name = app.utils.getStickerPDFName("S13");
      $('ul.pdf a.pdf-link').attr('href', '../pdf/' + name);
    },


    appfxCartClick : function (ev) {
      ev.preventDefault();
      window.scrollTo(0, 0);
      app.showMessage("Sorry, AppFX Stickers will be available shortly! <br>Please check back soon.");
      //this.addItemToCart("S10");
    },

    dclabsCartClick : function (ev) {
      ev.preventDefault();
      this.addItemToCart("S11");
    },

    scrollStickerTop : function (ev) {
      ev.preventDefault();
      window.scrollTo(0, 250);
    },

    copCartClick : function (ev) {
      ev.preventDefault();
      this.addItemToCart("S12");
    },

    patrolCartClick : function (ev) {
      ev.preventDefault();
      this.addItemToCart("S13");
    },

    addItemToCart : function(id){
      var item = app.catalog.getItemById(id);
      window.scrollTo(0, 0);
      app.cartItemList.addItem(item);
    },

    stickerBundleClick : function(ev) {
      var item = app.catalog.getItemById('B13');
      window.scrollTo(0, 0);
      app.cartItemList.addItem(item);
    },

    activate : function(itemNumber, name) {
      $("#"+name).addClass("active");
      $("div."+name).fadeIn();
      this.unActivateOthers(name);

      var item = app.catalog.getItemById(itemNumber);
      var description = app.utils.getStickerDescription(itemNumber)

     $("div."+name + " ul.description-list").html(description);

      window.scrollTo(0, 1300);
    },

    unActivateOthers : function(activeID){
      if ('appfx' !== activeID){
        $("#appfx").removeClass("active");
        $("div.appfx").css("display", "none");
      }

      if ('dclabs' !== activeID){
        $("#dclabs").removeClass("active");
        $("div.dclabs").css("display", "none");
      }

      if ('cop' !== activeID){
        $("#cop").removeClass("active");
        $("div.cop").css("display", "none");
      }

      if ('patrol' !== activeID){
        $("#patrol").removeClass("active");
        $("div.patrol").css("display", "none");
      }
    },


    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    postRender : function() {
      this.$('.inner').ajaxStart(app.utils.showGlobalLoader).ajaxStop(app.utils.hideGlobalLoader);
      this.activate('S10', 'appfx');
      $('ul.pdf a.pdf-link').attr('href', '../pdf/AppFX-race-appfx-stickers-spec.pdf');
    }

  });

  return stickersView;
});

