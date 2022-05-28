define(
['jquery', 'underscore', 'backbone', '../../models/device-exchange/device-model'],

function($, _, Backbone, DeviceModel) {

	var DeviceCollection = Backbone.Collection.extend({
		model: DeviceModel,
		url: "rest/device/",
		criteria:"",
		type:"",

    initialize : function (models, opts) {
    },

   sync: function(method, model, options){

      if (this.criteria === ""){
        options.url = 'rest/device/type/'+this.type;
      } else {
        options.url = 'rest/device/criteria/'+this.criteria+'/type/'+this.type;
      }


      Backbone.sync(method, model, options);
    }


	});

	return DeviceCollection;
});