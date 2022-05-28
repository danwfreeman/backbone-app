define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/stickers/gallery.html',
], function($, _, backbone, galleryHtml){

  var galleryView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(galleryHtml);

    },

    events : {
      "click #stickers .fx-items img" : "setStickerImage",
      "click #stickers img.main-image" : "doTrackClick",
    },

    setStickerImage : function(ev) {
      var img = $("#stickers .main-image");
      img.attr('src', ev.target.src);
    },

    doTrackClick : function(ev) {
        app.navigate("stickerTypes", true);
    },

    render : function () {
      this.$el.html(this.template());
      return this.el;
    },

    postRender : function() {
      $("#stickers .main-image").attr('src', '../images/stickers/appfx_front.jpg');
    },

    getTitle : function(){
      return "FX Stickers";
    }

  });

  return galleryView;
});

