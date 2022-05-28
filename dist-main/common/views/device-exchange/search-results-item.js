define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'text!templates/device-exchange/search-results-item.html',
  'text!templates/device-exchange/contact-seller.html'
], function($, _, backbone, modelBinder, deviceItemHtml, contactSellerHtml){

  var deviceItemView = Backbone.View.extend({

    tagName : 'div',
    className : 'device-item fx-label',


    initialize: function() {
        _.bindAll(this, 'emailSuccessCallback', 'emailErrorCallback', 'removeSuccessCallback', 'removeErrorCallback');
        this.binder = new modelBinder();
        this.model.validation.email = {required:true, pattern: 'email'};
        this.template = _.template(deviceItemHtml);
        this.sellerTemplate = _.template(contactSellerHtml);
        this.isExpanded = false;
    },

    events : {
      "click .contact-seller" : "contactSeller",
      "click .remove-item" : "removeItem",
      "click #submit-button" : "sendEmail"
    },

    contactSeller : function (ev) {
        if (this.isExpanded === true){
          this.$("#contact-seller-section").remove();
          this.isExpanded = false;
        } else {
          this.$el.append(this.sellerTemplate);
          this.binder.bind(this.model, this.el);  // bind the form for the validation
          Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true});
          this.isExpanded = true;
          if (app.isAuthUser() === true){
            this.model.set("email",app.credentialsModel.get("email") )
          }
        }
    },

    removeItem : function (ev) {
      if (confirm('Are you sure you want to remove this item \'' +this.model.get('deviceName')+'\' ?')) {
          this.model.destroy({success:this.removeSuccessCallback, error:this.removeErrorCallback});  // calls update
      }
    },

    removeSuccessCallback : function(model, response, options){
      app.showMessage('You device has been removed from the postings, thank you');
      this.$el.remove();
    },

    removeErrorCallback : function(model, response, options){
      app.showError('Sorry, unable to remove your device at this time.');
    },


    sendEmail : function(ev){
        this.model.validate();
        var isValid = this.model.isValid();
        if (isValid === true) {
          app.utils.setAjaxLoading(ev.currentTarget);
          this.model.save(this.model, {success:this.emailSuccessCallback, error:this.emailErrorCallback, contact:true, urlRoot:'rest/device/contact/item/'});  // calls update
        }
    },

    emailSuccessCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#submit-button'));
      app.showMessage('Thank you, this seller has been contacted.');
    },

    emailErrorCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#submit-button'));
      app.showError('Sorry, we were unable to contact the seller at this time.');

    },

    render : function () {
      this.model.set('deviceName', this.getNameForType(this.model.get('deviceType')));
      this.$el.html(this.template(this.model.toJSON()));

      if (app.isAuthUser() === true){
        if (app.credentialsModel.get('id') === this.model.get('credentialsId')){
          $('.remove-item', this.$el).css('display', 'inline');
          $('.contact-seller', this.$el).hide();
        }
      }

      return this;
    },

    getNameForType : function(type) {
      if (type === 'iphone3g'){
        return "iPhone 3G";
      } else if (type === 'iphone3gs'){
        return "iPhone 3GS";
      } else if (type === 'iphone4'){
        return "iPhone 4";
      } else if (type === 'iphone4s'){
        return "iPhone 4s";
      } else if(type === 'ipod3'){
        return "iPod 3rd Gen";
      } else if (type === 'ipod4'){
        return "iPod 4th Gen";
      }
    },


  });

  return deviceItemView;
});

