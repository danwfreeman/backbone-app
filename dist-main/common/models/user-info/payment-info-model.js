define(
['jquery', 'underscore', 'backbone'],

function($, _, Backbone) {

    var PaymentInfo = Backbone.Model.extend({

        validation:{
          type: {
            required: true
          },
          number: {
            required: true
          },
          expiryMonth: {
            required: true
          },
          expiryYear: {
            required: true
          },
          cvv: {
            required: true
          },
          name: {
            required: true
          }
        },

        labels: {
          type: "Card type",
          number: "Card number",
          expiryMonth: "Expiry month",
          expiryYear: "Expiry year",
          cvv: "CVV code",
          name: "Name, as it appears on the card,"
        },

        urlRoot: "payment_info/",
        defaults: {
            "id": null,
            "type": "MasterCard",  // reg1, reg2, shipping, billing
            "number": "",
            "expiryMonth":"",
            "expiryYear": "",
            "cvv": "",
            "name": "",
        }

    });

    return PaymentInfo;

});