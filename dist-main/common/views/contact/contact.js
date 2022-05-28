define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'text!templates/contact/contact.html',
], function($, _, backbone, modelBinder, contactHtml){

  var contactView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, 'successCallback', 'errorCallback');

        this.template = _.template(contactHtml);
        this.binder = new modelBinder();
    },

    events : {
      "click #submit-button" : "doSubmit"
//      "click .our-terms a" : "showPopup",
//      "click #pop-up" : "doPopupClose"
    },

    render: function(eventName) {
        this.$el.html(this.template());
        this.binder.bind(this.model, this.el);
        return this.$el;
    },

    postRender : function(){
      $('.submitquest button').val("submit request");
//        $('.our-terms a').hover(function(e) {
//          $('#contact-us div#pop-up').show();
//        }, function() {
//          //$('#contact-us div#pop-up').hide();
//        });
    },

//    showPopup : function(ev) {
//      ev.preventDefault();
//      $('#contact-us div#pop-up').show();
//    },
//
//    doPopupClose : function(){
//      $('#contact-us div#pop-up').hide();
//    },

    doSubmit:function(ev) {
        ev.preventDefault();
        Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true });
        if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

        this.model.validate();
        var isValid = this.model.isValid();
        if (isValid === true) {
          //app.navigate("receipt/"+id, true);
          //var r = this.model.fetch();
          app.utils.setAjaxLoading(ev.currentTarget);
          var r = this.model.save(this.model, {success:this.successCallback, error: this.errorCallback});
          window.console.log(r);
        }

    },

    successCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#submit-button'));
      app.showMessage('Thank you, you request was received and will be answered shortly');
    },

    errorCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#submit-button'));
      app.showError('Sorry, there was an error with your form submission. Please try again at a later time or email us directly');
    },


    getTitle : function(){
      return "Contact Us";
    }

  });

  return contactView;
});