define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/terms-conditions.html'
], function($, _, backbone, termsHtml){

  var termsView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(termsHtml);
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    getTitle : function() {
      return "Terms And Conditions";
    },


  });

  return termsView;
});