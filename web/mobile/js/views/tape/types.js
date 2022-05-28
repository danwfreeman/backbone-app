define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tape/types.html',
], function($, _, backbone, typesHtml){

  var typesView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(typesHtml);
    },

    events : {
      "click .cart-item-type .title-area img" : "doDetailsClick",
    },


    render : function () {
      this.$el.html(this.template());
      return this.el;
    },


    doDetailsClick : function (ev) {
        var name = ev.target.className;
        app.navigate("tapeDetails/"+name, true);
    },

    getTitle : function(){
      return "FX Track";
    }


  });

  return typesView;
});

