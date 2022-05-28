define([
  'jquery',
  'underscore',
  'backbone',
  'views/user/user-info-item',
  '../../../common/models/user-info/user-info-model',
  'text!templates/user/shipping-billing.html'

], function($, _, backbone, UserInfoItemView, UserInfoModel, shippingBillingHtml){

  var userInfoView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, 'createSuccessCallback', 'createErrorCallback', 'updateSuccessCallback', 'updateErrorCallback');
        this.template = _.template(shippingBillingHtml);
    },



    render: function(eventName) {
      this.$el.html(this.template());

      var shippingModel = app.userInfoList.where({type:'S'})[0];
      var billingModel = app.userInfoList.where({type:'B'})[0];

      if (shippingModel == null) {
        shippingModel = new UserInfoModel({type:'S'});
        app.userInfoList.add(shippingModel);
      }
      if (billingModel == null) {
        billingModel = new UserInfoModel({type:'B'});
        app.userInfoList.add(billingModel);
      }

      this.shippingView = new UserInfoItemView({
          model : shippingModel
        });
      this.$("#shipping_billing .billingLft").append(this.shippingView.render().el);

      this.billingView = new UserInfoItemView({
          model : billingModel
        });
      this.$("#shipping_billing .billingrht").append(this.billingView.render().el);


      return this.el;
    },

    // if reg'd and logged in, then pre-fill form
    postRender : function(){
      var regModel = app.userInfoList.where({type:'R'})[0];
      if (regModel != null){
        this.shippingView.populateFromModel(regModel);
      }
    },

    events : {
      "click #proceed" : "doSaveAddresses"
    },


    doSaveAddresses : function(ev) {
      ev.preventDefault();
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

      var sValid = this.shippingView.isValid();
      var bValid= this.billingView.isValid();

      if (sValid === false || bValid === false) {
        app.showError("Please correct data entry fields in error below");
        return;
      }

      app.utils.setAjaxLoading(ev.currentTarget);

      // either one or both models will be new or already exist
      if (this.shippingView.model.get('id') == null && this.billingView.model.get('id') == null){
        app.userInfoList.sync("create", app.userInfoList, {success:this.createSuccessCallback, error:this.createErrorCallback, wait:true, url:'rest/user_info/session/list/'});
      } else {
        app.userInfoList.sync("update", app.userInfoList, {success:this.updateSuccessCallback, error:this.updateErrorCallback, wait:true, url:'rest/user_info/session/list/'});
      }
    },

    createSuccessCallback : function(models, response, options){
        app.utils.unsetAjaxLoading($('#proceed'));
        app.userInfoList.reset(models);  // reset list with the new list from the server - with id's
        app.navigate("reviewCart", true);
    },

    createErrorCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#proceed'));
      app.showError("Sorry, could not save your Shipping or Billing info at this time");
    },

    updateSuccessCallback : function(model, response, options){
        // no need to update client copy, already bound on client
        app.utils.unsetAjaxLoading($('#proceed'));
        app.navigate("reviewCart", true);
    },

    updateErrorCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#proceed'));
      app.showError("Sorry, could not update your Shipping or Billing info at this time");
    }



  });

  return userInfoView;
});