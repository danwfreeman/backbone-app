define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/app/getapp.html'
], function($, _, backbone, getappHtml){

  var getappView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(getappHtml);
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },


  });

  return getappView;
});