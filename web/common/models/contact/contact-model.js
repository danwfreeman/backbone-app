define(
['jquery', 'underscore', 'backbone'],

function($, _, Backbone) {

    var Contact = Backbone.Model.extend({

        validation:{
          firstName: {
            required: true
          },
          lastName: {
            required: true
          },
          email: {
            required: true,
            pattern: 'email'
          },
          message: {
            required: true
          },
          agreeBox: {
            acceptance: true
          }
        },

        urlRoot: "rest/contact/",
        defaults: {
            "id": null,
            "firstName" : "",
            "lastName" : "",
            "email" : "",
            "message" : ""
        },

        labels: {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email Address",
          agreeBox: "Read Our Terms"
        }

    });

    return Contact;

});