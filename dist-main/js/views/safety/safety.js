define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/safety/safety.html'
], function($, _, backbone, safetyHtml){

  var safetyView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(safetyHtml);
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    getTitle : function() {
      return "Product Safety";
    },

    events: {
      "mouseover  #product-safety #car-top div.front" : "showTopFront",
      "mouseout  #product-safety #car-top div.front" : "hideTopFront",
      "mouseover  #product-safety #car-top div.middle" : "showTopMiddle",
      "mouseout  #product-safety #car-top div.middle" : "hideTopMiddle",
      "mouseover  #product-safety #car-top div.back" : "showTopBack",
      "mouseout  #product-safety #car-top div.back" : "hideTopBack",
      "mouseover  #product-safety #car-bottom div.front" : "showBottomFront",
      "mouseout  #product-safety #car-bottom div.front" : "hideBottomFront",
      "mouseover  #product-safety #car-bottom div.middle" : "showBottomMiddle",
      "mouseout  #product-safety #car-bottom div.middle" : "hideBottomMiddle",
      "mouseover  #product-safety #car-bottom div.back" : "showBottomBack",
      "mouseout  #product-safety #car-bottom div.back" : "hideBottomBack",
      "mouseover  #product-safety #recycle" : "showRecycle",
      "mouseout  #product-safety #recycle" : "hideRecycle"
    },

    showTopFront : function(){
      $('#product-safety #car-top .front div').show();
    },
    hideTopFront : function(){
      $('#product-safety #car-top .front div').hide();
    },
    showTopMiddle : function(){
      $('#product-safety #car-top .middle div').show();
    },
    hideTopMiddle : function(){
      $('#product-safety #car-top .middle div').hide();
    },
    showTopBack : function(){
      $('#product-safety #car-top .back div').show();
    },
    hideTopBack : function(){
      $('#product-safety #car-top .back div').hide();
    },


    showBottomFront : function(){
      $('#product-safety #car-bottom .front div').show();
    },
    hideBottomFront : function(){
      $('#product-safety #car-bottom .front div').hide();
    },
    showBottomMiddle : function(){
      $('#product-safety #car-bottom .middle div').show();
    },
    hideBottomMiddle : function(){
      $('#product-safety #car-bottom .middle div').hide();
    },
    showBottomBack : function(){
      $('#product-safety #car-bottom .back div').show();
    },
    hideBottomBack : function(){
      $('#product-safety #car-bottom .back div').hide();
    },
    showRecycle : function(){
      $('#product-safety #recycle div').show();
    },
    hideRecycle : function(){
      $('#product-safety #recycle div').hide();
    }



  });

  return safetyView;
});