define(
['jquery', 'underscore', 'backbone'],

function($, _, Backbone) {

    var CartItem = Backbone.Model.extend({

       validation: {
          quantity: {
            required: true,
            range: [1, 99],
            msg: 'Please specify: 1-99'
          }
        },

        labels: {
          quantity: "Quantity"
        },


        urlRoot: "rest/cart/item/",
        defaults: {
        },

        initialize : function () {
          //this.on("change:quantity", this.updateTotal);
        },

        updateTotal : function () {
          if (this.isValid() === false) return; // don't try to calc the price with an invalid number
          var t = this.get('quantity') * this.get('price');
          t = Math.round(t*100)/100;
          t = app.utils.padDecimal(t);
          this.set({
            total : t
          });
        }

    });

    return CartItem;
});