define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/device-exchange/search.html'
], function($, _, backbone, searchHtml){

  var searchView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, 'searchSuccessCallback', 'searchErrorCallback');
        this.template = _.template(searchHtml);
    },

    render : function () {
      this.$el.html(this.template());
      return this.el;
    },

    getTitle : function(){
      return "Device Search";
    },

    events : {
      "click .submit #search-button" : "search",
    },

    search : function(ev){
      ev.preventDefault();
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

      app.deviceList.criteria = this.$("#criteria").val();
      app.deviceList.type = this.$("#device-type").val();

      app.utils.setAjaxLoading(ev.currentTarget);
      app.deviceList.fetch({success:this.searchSuccessCallback, error:this.searchErrorCallback})

    },


    searchSuccessCallback : function(collection, response, options) {
      app.utils.unsetAjaxLoading($('#search-button'));
      app.deviceList = collection;
      app.navigate("searchDeviceResults", true);
    },

    searchErrorCallback : function(collection, response, options) {
      app.utils.unsetAjaxLoading($('#search-button'));
      app.showError('Sorry, search for devices was not successful at this time.');
    },


  });

  return searchView;
});

