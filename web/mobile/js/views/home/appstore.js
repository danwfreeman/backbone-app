define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/appstore.html'
], function($, _, backbone, appstoreHtml){

  var appstoreView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(appstoreHtml);
    },


    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    getTitle : function() {
      return "";
    }

  });

  return appstoreView;
});