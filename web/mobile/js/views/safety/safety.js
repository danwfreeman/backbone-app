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

    postRender : function(){
      $('#product-safety #verbiage-area').hide();
    },

    events: {
      "click  #product-safety #car-top div.front" : "showTopFront",
      "click  #product-safety #car-top div.middle" : "showTopMiddle",
      "click  #product-safety #car-top div.back" : "showTopBack",
      "click  #product-safety #car-bottom div.front" : "showBottomFront",
      "click  #product-safety #car-bottom div.middle" : "showBottomMiddle",
      "click  #product-safety #car-bottom div.back" : "showBottomBack",
      "click  #product-safety #recycle" : "showRecycle"
    },

    displayMessage : function(text){
//      if (app.mode === 'landscape'){
//        $('.bottom-verbiage').scrollTop($('.bottom-verbiage').height());
//      }

      $('#product-safety #verbiage-area').show();
      $('#product-safety #verbiage-area').text(text);
    },

    showTopFront : function(ev){
      this.activateGlow($(ev.target));
      this.displayMessage("Solid body construction with thick plastic and wide body design supports the weight of any adult using");
    },

    showTopMiddle : function(ev){
      this.activateGlow($(ev.target));
      this.displayMessage("High quality silicon rubber, the same material as high-end iPhone cases.  Provides comfort, grip and control, and sustained repeated use");
    },

    showTopBack : function(ev){
      this.activateGlow($(ev.target));
      this.displayMessage("Two rear ports channel sound out of the device for amplified effects and music");
    },

    showBottomFront : function(ev){
      this.activateGlow($(ev.target));
      this.displayMessage("Stainless steel axel that will not rust and 100% recyclable ");
    },

    showBottomMiddle : function(ev){
      this.activateGlow($(ev.target));
      this.displayMessage("Additional layer of plastic added to remove sharp edges that could make the toy potentially dangerous");
    },

    showBottomBack : function(ev){
      this.activateGlow($(ev.target));
      this.displayMessage("Rubber wheels for maximum traction and precise movement control");
    },

    showRecycle : function(ev){
      this.resetGlows();
      $(ev.target).css('background-image', 'url("../../images/product/recycle_glow.png")');
      this.displayMessage("Fully Recyclable, the entire car can be taken to any local recycling center.");
    },

    activateGlow : function(dot){
      this.resetGlows();
      dot.css('background-image', 'url("../../images/product/callout_glow.png")');
    },

    resetGlows : function() {
      $('#product-safety .safety-area-image #car-top div').css('background-image', 'url("../../images/product/callout.png")');
      $('#product-safety .safety-area-image #car-bottom div').css('background-image', 'url("../../images/product/callout.png")');
      $('#product-safety .safety-area-image #recycle div').css('background-image', 'url("../../images/product/recycle.png")');
    },

    getTitle : function() {
      return "Product Design";
    }


  });

  return safetyView;
});