define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/stickers/options.html',
], function($, _, backbone, optionsHtml){

  var option1View = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(optionsHtml);
    },

    events : {
      "click .options img" : "navType"
    },


    render : function () {
      this.$el.html(this.template());
      return this.el;
    },

    getTitle : function(){
      return "FX Stickers";
    },

    navType : function() {
      app.navigate("stickersGallery", true);
    }


  });

  return option1View;
});

