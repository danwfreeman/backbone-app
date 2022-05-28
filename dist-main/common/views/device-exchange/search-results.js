define([
  'jquery',
  'underscore',
  'backbone',
  '../../views/device-exchange/search-results-item',
  'text!templates/device-exchange/search-results.html'
], function($, _, backbone, SearchResultsItemView, searchResultsHtml){

  var searchResultsView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template(searchResultsHtml);
    },

    render : function () {
      var imageName = this.getImageForType(app.deviceList.type);
      this.$el.html(this.template({imageName:imageName}));

      for (var i=0;i<app.deviceList.models.length;i++) {
        this.renderDeviceItem(app.deviceList.models[i], i);
      }

      return this.el;
    },

    renderDeviceItem : function (deviceItem, i) {
      var view = new SearchResultsItemView({
          model : deviceItem
        });
      this.$("#device-list").append(view.render().el);
    },


    getTitle : function(){
      return "Device Search Results";
    },

    events : {
//      "click .submit img" : "search",
    },

    getImageForType : function(type){
      if (type === 'iphone3g'){
        return "iphone3GS";
      } else if (type === 'iphone3gs'){
        return "iphone3GS";
      } else if (type === 'iphone4'){
        return "iphone4GS";
      } else if (type === 'iphone4s'){
        return "iphone4GS";
      } else if(type === 'ipod3'){
        return "ipod3";
      } else if (type === 'ipod4'){
        return "ipod4";
      } else {
        return "all";
      }
    }


  });

  return searchResultsView;
});

