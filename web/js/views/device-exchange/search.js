define([
  'jquery',
  'underscore',
  'backbone',
  'views/device-exchange/search-results-item',
  'text!templates/device-exchange/search.html',
  'text!templates/device-exchange/landing-text.html'
], function($, _, backbone, SearchResultsItemView, searchHtml, landingTextHtml){

  var searchView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, 'searchSuccessCallback', 'searchErrorCallback', 'emailSuccessCallback', 'emailErrorCallback');
        this.template = _.template(searchHtml);
        this.landingText = _.template(landingTextHtml);
    },

    render : function () {
      this.$el.html(this.template());
      $('#search-results-items', this.el).html(this.landingText);

      return this.el;
    },

    postRender : function() {
      var view = this;
      $( "#contact-seller-dialog" ).dialog({
        autoOpen: false,
        height: 400,
        width: 260,
        modal: true,
        draggable: false,
        buttons: {
          "Send Email": function() {
              $(this).dialog.model.set('email', $('#contact-seller-dialog input[name=email]').val());
              $(this).dialog.model.set('deviceMessage', $('#contact-seller-dialog input[name=deviceMessage]').val());
              $(this).dialog.model.validate();
              var isValid = $(this).dialog.model.isValid();
              if (isValid === true) {
                $(this).dialog("close");
                $(this).dialog.model.save(this.model, {success: view.emailSuccessCallback, error: view.emailErrorCallback, contact:true, urlRoot:'rest/device/contact/item/'});  // calls update
              }
          },
          Cancel: function() {
            $( this ).dialog( "close" );
          }
        },
        close: function() {
        }
      });
    },

    emailSuccessCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#submit-button'));
      app.showMessage('Thank you, this seller has been contacted.');
    },

    emailErrorCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#submit-button'));
      app.showError('Sorry, we were unable to contact the seller at this time.');

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

      $('#search-results-items').empty();

      for (var i=0;i<collection.models.length;i++) {
        var resultItemModel = collection.models[i];
        var view = new SearchResultsItemView({
          model : resultItemModel
        });

        this.$("#search-results-items").append(view.render().el);
				this.$("#"+resultItemModel.get("id")).mCustomScrollbar({});
      }
    },

    searchErrorCallback : function(collection, response, options) {
      app.utils.unsetAjaxLoading($('#search-button'));
      app.showError('Sorry, search for devices was not successful at this time.');
    },


  });

  return searchView;
});

