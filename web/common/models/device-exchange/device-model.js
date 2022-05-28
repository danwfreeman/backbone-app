define(
['jquery', 'underscore', 'backbone'],

function($, _, Backbone) {

    var Device = Backbone.Model.extend({

        validation:{
          deviceType: {
            required: true
          },
          price: {
            required: true
          },
          description: {
            required: true
          }
        },

        sync: function(method, model, options) {
          model.urlRoot = options.urlRoot;

          Backbone.sync(method, model, options);
        },


        urlRoot: "rest/device/",
        defaults: {
            "id": null,
            "deviceType":"",
            "price":"",
            "description":"",
            "credentialsId":-1,
            "email" : "",
            "deviceMessage" : ""
        },

        labels: {
            "deviceType":"Device Type",
            "price":"Price",
            "description":"Description",
            "email": "Email address",
            "deviceMessage" : "Device Message"
        }

    });

    return Device;

});