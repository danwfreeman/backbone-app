define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/home.html'
], function($, _, backbone, homeHtml){

  var homeView = Backbone.View.extend({

    id : 'home',

    initialize: function() {
        this.template = _.template(homeHtml);
    },

    events: {
      "click .stockcar" : "fxStockCarClick",
      "click .tape-tracks" : "tapeTrackClick",
    },

    fxStockCarClick : function (ev) {
      ev.preventDefault();
      app.navigate("stockCar", true);
    },

    tapeTrackClick : function (ev) {
      ev.preventDefault();
      app.navigate("tape", true);
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    postRender : function (){
        $(".scrollable").scrollable().navigator('.navi');   // init the scrollable images
        $(".scrollable").scrollable().focus(); // some bug in here, won't scroll dots
    },

    getTitle : function() {
      return "";
    }

  });

  return homeView;
});