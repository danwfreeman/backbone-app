({
  appDir : './web',
  baseUrl : "js",
  dir : './dist-main',
  modules: [
	{
		name:'main'
	}
  ],
  fileExclusionRegExp: /^WEB-INF$/,
  removeCombined : true,
  inlineText: true,
  paths : {
    jquery : "../common/libs/jquery",
    jqueryMobile: "../mobile/js/libs/jqueryMobile",
    underscore : "../common/libs/lodash",
    backbone : "../common/libs/backbone",
    scrollable : "../common/libs/scrollable",
    modelBinder : "../common/libs/ModelBinder",
    validation : "../common/libs/validation",
    tms : "../common/libs/tms-0.4.x",
    sliderkit : "../lib/js/sliderkit/jquery.sliderkit.1.9.2",
    sliderkitdelay : "../lib/js/sliderkit/addons/sliderkit.delaycaptions.1.1",
    sliderkitcounter : "../lib/js/sliderkit/addons/sliderkit.counter.1.0",
    sliderkittimer : "../lib/js/sliderkit/addons/sliderkit.timer.1.0",
    sliderkitimagefx : "../lib/js/sliderkit/addons/sliderkit.imagefx.1.0",
    mousewheel : "../lib/js/external/jquery.mousewheel.min",
    text : "text"	
  },

  shim : {
    backbone : {
      deps : ["underscore", "jquery"],
      exports : "Backbone"
    },

    scrollable : {
      deps : ["jquery"],
      exports : "$"
    },

    tms : {
      deps : ["jquery"],
      exports : "$"
    },

    sliderkit : {
      deps : ["jquery"],
      exports : "$"
    },

    sliderkitdelay : {
      deps : ["sliderkit"],
      exports : "SliderKit"
    },

    sliderkitcounter : {
      deps : ["sliderkit"],
      exports : "SliderKit"
    },

    sliderkittimer : {
      deps : ["sliderkit"],
      exports : "SliderKit"
    },

    sliderkitimagefx : {
      deps : ["sliderkit"],
      exports : "SliderKit"
    },

    mousewheel : {
      deps : ["jquery"],
      exports : "$"
    }

  }

})
