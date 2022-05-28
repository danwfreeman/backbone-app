({
  appDir : './web/',  // all files copied to dir
  baseUrl : "mobile/js",  // relative to appDir - anchor for finding files
  dir : './dist-mobile',
  modules: [
	{
		name:'main'
	}
  ],
  fileExclusionRegExp: /^WEB-INF$/,
  removeCombined : true,
  inlineText: true,
  keepBuildDir: true,
  paths : {
    jquery : "../../common/libs/jquery",
    jqueryMobile: "../../common/libs/jqueryMobile",
    underscore : "../../common/libs/lodash",
    backbone : "../../common/libs/backbone",
    scrollable : "../../common/libs/scrollable",
    modelBinder : "../../common/libs/ModelBinder",
    validation : "../../common/libs/validation",
    text : "../../js/text"	
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
	
  }

})
