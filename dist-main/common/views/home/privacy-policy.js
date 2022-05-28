define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/privacy-policy.html'
], function($, _, backbone, policyHtml){

  var policyView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(policyHtml);
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    getTitle : function() {
      return "Privacy Policy";
    },


  });

  return policyView;
});