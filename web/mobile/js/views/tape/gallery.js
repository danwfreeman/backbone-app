define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tape/gallery.html',
], function($, _, backbone, galleryHtml){

  var galleryView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(galleryHtml);

    },

    events : {
      "click #tracks .fx-items img" : "setTrackImage",
      "click #tracks img.main-image" : "doTrackClick",
    },

    setTrackImage : function(ev) {
      var img = $("#tracks .main-image");
      img.attr('src', ev.target.src);
    },

    doTrackClick : function(ev) {
      app.navigate("tapeDetails/tape", true);
    },

    render : function () {
      this.$el.html(this.template());
      return this.el;
    },

    getTitle : function(){
      $("#tracks .main-image").attr('src', '../images/track/track1.jpg');
      return "FX Track";
    }

  });

  return galleryView;
});

