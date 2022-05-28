// Original concepts provided by Backbone Boilerplate project: https://github.com/tbranyen/backbone-boilerplate
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  baseUrl: "js",

  paths: {
    // Libraries
    jquery: "../../common/libs/jquery",
    underscore: "../../common/libs/lodash",
    jqueryMobile: "../../common/libs/jqueryMobile",
    //retina: "../../common/libs/retina-1.1.0",
    backbone: "../../common/libs/backbone",
    scrollable: "../../common/libs/scrollable",
    modelBinder: "../../common/libs/ModelBinder",
    validation: "../../common/libs/validation",
    text: "../../js/text"
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
    jqueryMobile : {
      deps:["jquery"],
      exports: "$.mobile"
    }
//    , retina : {
//      deps: ["jquery"],
//      exports: "Retina"
//    }
  }

});



