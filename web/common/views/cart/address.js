define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/cart/address.html',
], function($, _, backbone, addressHtml){

  var addressView = Backbone.View.extend({

    initialize: function() {
      this.template = _.template(addressHtml);
    },

    render : function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return addressView;
});

