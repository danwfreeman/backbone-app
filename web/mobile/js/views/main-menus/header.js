define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/main-menus/header.html'
], function($, _, backbone, headerHtml){

  var headerView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(headerHtml);
    },

    // special case for back button, we don't want it to add to the history so avoid the router
    events: {
      "click .back" : "backClick"
    },

    backClick : function(ev){
        ev.preventDefault();
        window.history.back();
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    setTitle: function(title) {
      this.$('.title').html(title);
    }

  });

  return headerView;
});