// Original concepts provided by Backbone Boilerplate project: https://github.com/tbranyen/backbone-boilerplate
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  baseUrl: "js",

  paths: {
    jquery: "../common/libs/jquery",
    underscore: "../common/libs/lodash",
    backbone: "../common/libs/backbone",
    scrollable: "../common/libs/scrollable",
    modelBinder: "../common/libs/ModelBinder",
    validation: "../common/libs/validation",
    tms: "../common/libs/tms-0.4.x",
    interactive3d: "../common/libs/jquery.interactive_3d",
    sliderkit : "../lib/js/sliderkit/jquery.sliderkit.1.9.2",
    sliderkitdelay : "../lib/js/sliderkit/addons/sliderkit.delaycaptions.1.1",
    sliderkitcounter : "../lib/js/sliderkit/addons/sliderkit.counter.1.0",
    sliderkittimer : "../lib/js/sliderkit/addons/sliderkit.timer.1.0",
    sliderkitimagefx : "../lib/js/sliderkit/addons/sliderkit.imagefx.1.0",
    mousewheel : "../lib/js/external/jquery.mousewheel.min",
    jqueryui : "../lib/js/external/jquery-ui.min",
    customScrollbar : "../lib/js/external/jquery.mCustomScrollbar",
    text: "text"

  },

  shim: {
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    scrollable : {
      deps: ["jquery"],
      exports: "$"
    },

    tms : {
      deps: ["jquery"],
      exports: "$"
    },

    interactive3d : {
      deps: ["jquery"],
      exports: "$"
    },

    sliderkit : {
       deps: ["jquery"],
       exports: "$"
    },

    sliderkitdelay : {
      deps: ["sliderkit"],
      exports : "SliderKit"
    },

    sliderkitcounter : {
      deps: ["sliderkit"],
      exports : "SliderKit"
    },

    sliderkittimer : {
      deps: ["sliderkit"],
      exports : "SliderKit"
    },

    sliderkitimagefx : {
      deps: ["sliderkit"],
      exports : "SliderKit"
    },

    mousewheel : {
      deps: ["jquery"],
      exports : "$"
    },

    jqueryui : {
      deps: ["jquery"],
      exports : "$"
    },

    customScrollbar : {
      deps: ["jquery"],
      exports : "$"
    }

  }

});



