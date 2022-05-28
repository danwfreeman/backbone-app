define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'text!templates/cart/payment.html',
], function($, _, backbone, modelBinder, paymentHtml){

  var paymentView = Backbone.View.extend({

    initialize: function(model, errors) {
        this.binder = new modelBinder();
        this.id = 'payment';
        this.errors = errors;
        this.template = _.template(paymentHtml);

    },

    render : function () {
      this.$el.html(this.template());
      this.binder.bind(this.model, this.el);
      return this.el;
    },

    postRender : function () {
        if (this.errors != null && this.errors === 'errors') {
          // show paypal validation errors
          app.showErrors(app.paypalErrorList);
        }
    },

    events : {
      "click #continue-button" : "doContinue",
      "click .cvv img" : "showPopup",
      "click #pop-up .close" : "doPopupClose"

    },

    showPopup : function(ev) {
      ev.preventDefault();
      $('#payment-information div#pop-up').show();
    },

    doPopupClose : function(ev){
      ev.preventDefault();
      $('#payment-information div#pop-up').hide();
    },

    doContinue : function(ev) {
      // do ajax call to process payment, if successful show receipt page, if not display error message inline on page
//      var id = '1234';
      ev.preventDefault();
      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true});
      this.model.validate();
      var isValid = this.model.isValid();
      if (isValid === true) {
        app.paymentInfo = this.model;
        app.paypalErrorList = [];
        app.navigate("finalOrder", true);
      }
    },

    getTitle : function(){
      return "Payment Information";
    }


  });

  return paymentView;
});

