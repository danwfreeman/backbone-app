define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/track/track.html'
], function($, _, backbone, trackHtml){

  var trackView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(trackHtml);
				this.white = app.catalog.getItemById('T10');
				this.yellow = app.catalog.getItemById('T11');
				this.blue = app.catalog.getItemById('T12');
				this.bundle = app.catalog.getItemById('B15');

    },

    events : {
      "click #addToCart" : "addToCart",
    },


    addToCart : function(ev){
      window.scrollTo(0, 0);
      var selectedItemNumbers = this.getSelectedItems();
      var items = [];
      for (var i=0; i<selectedItemNumbers.length; i++){
        items.push(app.catalog.getItemById(selectedItemNumbers[i]));
      }
      app.cartItemList.addItems(items);
    },

    getSelectedItems : function() {
       var boxes = $('.tapeLftbox input[type="checkbox"]');
       var selected = [];
       $.each(boxes, function(index, value){
          if (value.checked === true){
            selected.push(value.value);
          }
       });
       return selected;
    },

    render: function(eventName) {
        this.$el.html(this.template());
        return this.el;
    },

    postRender : function() {
        this.$('.inner').ajaxStart(app.utils.showGlobalLoader).ajaxStop(app.utils.hideGlobalLoader);
				$(".photosgallery-vertical").sliderkit({
					circular:false,
					mousewheel:false,
					shownavitems:2,
					verticalnav:true,
					navclipcenter:true,
					auto:false
				});

        $('#white span.price').text("Price: $" + this.white.price);
        $('.tapeLftbox input[name="white"]').val(this.white.itemNumber)
        $('#yellow span.price').text("Price: $" + this.yellow.price);
        $('.tapeLftbox input[name="yellow"]').val(this.yellow.itemNumber)
        $('#blue span.price').text("Price: $" + this.blue.price);
        $('.tapeLftbox input[name="blue"]').val(this.blue.itemNumber)
        $('#bundle span.price').text("Price: $" + this.bundle.price);
        $('.tapeLftbox input[name="bundle"]').val(this.bundle.itemNumber)

    }

  });

  return trackView;
});

