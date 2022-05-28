define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/main-menus/main-menu.html'
], function($, _, backbone, mainMenuHtml){

  var mainMenuView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(mainMenuHtml);
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    events: {
      "click .car" : "carClick",
      "click .stickers" : "stickersClick",
      "click .track" : "trackClick",
      "click .app" : "appClick",
      "click .exchange" : "exchangeClick",
      "click .safety" : "safetyClick",
      "click .blog" : "blogClick",
      "click .contact" : "contactClick"
    },

    carClick : function (ev) {
      ev.preventDefault();
      app.navigate("stockCar", true);
    },

    stickersClick : function (ev) {
      ev.preventDefault();
      app.navigate("stickers", true);
    },

    trackClick : function (ev) {
      ev.preventDefault();
      app.navigate("tape", true);
    },

    appClick : function (ev) {
      ev.preventDefault();
      app.navigate("appstore", true);
    },

    exchangeClick : function (ev) {
      ev.preventDefault();
      app.navigate("deviceExchange", true);
    },

    safetyClick : function (ev) {
      ev.preventDefault();
      app.navigate("safety", true);
    },

    blogClick : function (ev) {
      ev.preventDefault();
      app.navigate("blog", true);
    },

    contactClick : function (ev) {
      ev.preventDefault();
      app.navigate("contactus", true);

      //$(el.currentTarget).addClass('selected');
    }


  });

  return mainMenuView;
});