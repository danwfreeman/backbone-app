define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/stock-car/fx-car.html',
], function($, _, backbone, carHtml){

  var carView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(carHtml);

    },

    events : {
      "click #car-package .fx-items img" : "setCarImage",
      "click #complete-package .fx-items img" : "setPackageImage",
      "click #car-package img#single-car" : "doSingleCarClick",
      "click #complete-package img#full-car" : "doFullPackageClick"
    },

    setCarImage : function(ev) {
      var img = $("#car-package .main-image");
      img.attr('src', ev.target.src);
    },

    setPackageImage : function(ev) {
      var img = $("#complete-package .main-image");
      img.attr('src', ev.target.src);
    },

    doSingleCarClick : function(ev) {
        app.navigate("fxCarDetails/C1", true);
    },

    doFullPackageClick : function(ev) {
        app.navigate("fxCarDetails/B10", true);
    },


    render : function () {
      this.$el.html(this.template());
      return this.el;
    },

    getTitle : function(){
      $("#car-package .main-image").attr('src', '../images/car/appfx_front.jpg');
      $("#complete-package .main-image").attr('src', '../images/mobile/home/fx_bundle_no_border.jpg');

      return "FX Car";
    }


  });

  return carView;
});

