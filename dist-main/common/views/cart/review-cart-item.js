define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/cart/review-cart-item.html',
], function($, _, backbone, reviewCartItemHtml){

  var reviewCartItemView = Backbone.View.extend({

    tagName : 'div',
    className : 'cart-item',


    initialize: function() {

      this.template = _.template(reviewCartItemHtml);
    },

    render : function () {
      this.$el.html(this.template(this.model.toJSON()));

      if (this.model.get('discounted') === true){
        var span = $('.discount',this.$el);
        var item = app.catalog.getItemById(this.model.get('itemNumber'));
        var oldTotal = parseFloat(item.price) * this.model.get('quantity')
        span.html('$' + app.utils.padDecimal(oldTotal));
        span.css('display', 'block');
      }
      return this;
    }

  });

  return reviewCartItemView;
});

