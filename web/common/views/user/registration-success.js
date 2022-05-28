define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/user/registration-successful.html',
], function($, _, backbone, successHtml){

  var successView = Backbone.View.extend({

    initialize: function(nav) {
        this.template = _.template(successHtml);
        this.nav = nav;
    },


    events : {
      "click #registration-success .submit #next-button" : "nextStep"
    },

    render : function () {
      this.$el.html(this.template());
      return this.el;
    },

    nextStep :function(ev) {
      if (this.nav != null) {
        app.navigate(this.nav, true);
      } else {
        app.navigate("checkout", true);
      }
    },

    getTitle : function(){
      return "Registration Successful";
    }


  });

  return successView;
});

