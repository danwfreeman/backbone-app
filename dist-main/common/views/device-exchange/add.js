define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'text!templates/device-exchange/add.html'
], function($, _, backbone,  modelBinder, addHtml){

  var addView = Backbone.View.extend({

    initialize: function() {
        this.binder = new modelBinder();
        _.bindAll(this, 'addSuccessCallback', 'addErrorCallback');
        this.template = _.template(addHtml);
    },

    render : function () {
      this.$el.html(this.template());
      this.binder.bind(this.model, this.el);
      return this.el;
    },

    getTitle : function(){
      return "Add Device";
    },

    events : {
      "click .submit #add-device-button" : "add",
    },

    add : function(ev){
      ev.preventDefault();
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

      if (app.isAuthUser() === false){
        //alert('you must be logged in to add a device');
        app.showMessage("You must be logged in to add a device");
        return;
      }

      this.model.set('credentialsId', app.credentialsModel.get("id"));

      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true});
      this.model.validate();
      var isValid = this.model.isValid();
      if (isValid === true) {
        app.utils.setAjaxLoading(ev.currentTarget);
        this.model.save(this.model, {success:this.addSuccessCallback, error:this.addErrorCallback, urlRoot:this.model.urlRoot + "add/"});
      }

    },


    addSuccessCallback : function(model, response, options) {
      app.utils.unsetAjaxLoading($("#add-device-button"));
      app.navigate("deviceExchange", true);
      app.showMessage('Your device has been listed successfully.')

    },

    addErrorCallback : function(model, response, options) {
      app.utils.unsetAjaxLoading($("#add-device-button"));
      app.showError('Sorry, add device did not succeed at this time.');
    },


  });

  return addView;
});

