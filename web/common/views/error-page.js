define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/error-page.html'
], function($, _, backbone, errorPageHtml){

  var termsView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(errorPageHtml);
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    getTitle : function() {
      return "Requested page was not found";
    },


  });

  return termsView;
});