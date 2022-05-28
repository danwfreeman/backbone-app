define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/home.html'
], function($, _, backbone, homeHtml){

  var homeView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(homeHtml);
    },

    events: {
      "click .stockcar" : "fxStockCarClick",
      "click .tape-tracks" : "tapeTrackClick",
      "click #bannerPrt .intro-image" : "introImageClick",
      "click #bannerPrt .complete-bundle-image" : "completeBundleImageClick",
      "click #bannerPrt .track-image" : "trackImageClick",
      "click #bannerPrt .sticker-bundle-image" : "stickerBundleImageClick"
    },

    fxStockCarClick : function (ev) {
      ev.preventDefault();
      app.navigate("stockCar", true);
    },

    tapeTrackClick : function (ev) {
      ev.preventDefault();
      app.navigate("tape", true);
    },

    introImageClick : function(ev){
      ev.preventDefault();
      app.navigate("car", true);
    },

    completeBundleImageClick : function(ev){
      ev.preventDefault();
      app.navigate("carPackage", true);
    },

    trackImageClick : function(ev){
      ev.preventDefault();
      app.navigate("track", true);
    },

    stickerBundleImageClick : function(ev){
      ev.preventDefault();
      app.navigate("stickers", true);
    },



    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    getTitle : function() {
      return "";
    }

  });

  return homeView;
});

