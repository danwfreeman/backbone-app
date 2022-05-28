define(
['jquery', 'underscore', 'backbone', 'validation'],

function($, _, Backbone, validation) {


    _.extend(Backbone.Validation.validators, {
      USZipcode: function(value, attr, customValue, model) {
        if (customValue === false){
          return; // don't validate
        }


        if (value == null){
          "Zip is required";
          return;
        }

        if(app.utils.isZipValid(value) === false){
          return "Zip is not a valid US zip code"
        }

      }
    });


    var UserInfo = Backbone.Model.extend({

        urlRoot: "rest/user_info/",
        defaults: {
            "id": null,
            "type": "",  // reg1, reg2, shipping, billing
            "sameAs": false,
            "firstName": "",
            "lastName": "",
            "email": "",
            "address1": "",
            "address2": "",
            "password":"",
            "password2":"",
            "city": "",
            "postal": "",
            "region": "",
            "country": "United States of America",
            "mobileNumber": ""

        },

        validation : {
          firstName : {
            required : true
          },
          lastName : {
            required : true
          },
          email : {
            required : true,
            pattern: 'email'
          },
          address1 : {
            required : true
          },
          city : {
            required : true
          },
          password: {
            required: true
          },
          password2: {
            equalTo: 'password',
            required: true
          },
          postal : {
            required : true,
            length: 5,
            pattern:'digits',
            USZipcode : true
          },
          region : {
            required : true
          },
          mobileNumber : {
            required : true
          }
        },

        labels: {
          firstName: "First Name",
          lastName: "Last Name",
          address1: "Address",
          postal: "Zip Code",
          region: "State",
          country: "",
          mobileNumber: "Mobile Number",
          password: "Password",
          password2: "Repeat Password"
        },

        sync: function(method, model, options) {
          //options.url = 'rest/user_info/session/';
          Backbone.sync(method, model, options);
        }

    }, {
      REGISTRATION : 'R',
      SHIPPING : 'S',
      BILLING : 'B'
    });

    return UserInfo;

});