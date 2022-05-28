define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/device-exchange/landing.html'
], function($, _, backbone, landingHtml){

  var landingView = Backbone.View.extend({

    initialize: function(name) {
        this.name = name;
        this.template = _.template(landingHtml);
    },

    render : function () {
      var info = app.userInfoList.where({type:app.userInfoList.model.REGISTRATION})[0];
      if (info == null) {
        this.$el.html(this.template());
        this.$('#add').hide();
      } else {
        this.$el.html(this.template(info.toJSON()));
        this.$('#create').hide();
      }



      return this.el;
    },

    getTitle : function(){
      return "Device XChange";
    },

    events : {
      "click .submit #search-button" : "search",
      "click .submit #create-button" : "createAccount",
      "click .submit #add-button" : "add",
    },

    search : function(ev){
      ev.preventDefault();
      app.navigate("searchDevices", true);
    },

    createAccount : function(ev){
      ev.preventDefault();
      app.navigate("login/deviceExchange", true);
    },

    add : function(ev){
      ev.preventDefault();
      app.navigate("addDevice", true);
    },


  });

  return landingView;
});

