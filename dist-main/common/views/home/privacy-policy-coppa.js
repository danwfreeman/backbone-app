define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/policy_coppa.html'
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
      return "COPPA Privacy Policy";
    },


  });

  return policyView;
});