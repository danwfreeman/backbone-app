define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/device-exchange/device-list.html'
], function($, _, backbone, deviceListHtml){

  var deviceListView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(deviceListHtml);
    },

    events: {
      "click .iphone-classic" : "getiPhoneClassic",
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    getiPhoneClassic : function(){

    },


    getTitle : function(){
      return "Device XChange";
    }

  });

  return deviceListView;
});