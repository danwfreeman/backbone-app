define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  '../../../../common/models/user-info/user-info-model',
  'text!templates/user/address.html',
  'text!templates/user/registration1.html',
  'text!templates/user/registration2.html'
], function($, _, backbone, modelBinder, UserInfoModel, addressHtml, registration1Html, registration2Html){

  var userInfoView = Backbone.View.extend({

    initialize: function(type, page, email, nav) {

        _.bindAll(this, 'updateSuccessCallback', 'updateErrorCallback');

        this.type = type;
        this.page = page;
        this.nav = nav;
        this.binder = new modelBinder();
        this.model = app.userInfoList.where({type:this.type})[0];

        if (this.model == null) {
          this.model = new UserInfoModel({type:this.type});
          this.model.set('id', app.userInfoList.length+1); // not persisted in db yet,  give client arbitrary id
        }

        if (email != null){
          this.model.set('email', email);
        }

        var html = null;

        if (type == app.userInfoList.model.REGISTRATION){
          if (page == 'reg1') {
            html = registration1Html;
            this.model.validation = this.getRegistration1Validation();
          } else if (page == 'reg2') {
            html = registration2Html;
            this.model.validation = this.getRegistration2Validation();
          }
        } else {
          html = addressHtml;
          this.model.validation = this.getAddressValidation();
        }
        this.template = _.template(html);


    },

    getAddressValidation : function(){
       var validation = {
          email: {
            required: true,
            pattern: 'email'
          },
          firstName: {
            required: true
          },
          lastName: {
            required: true
          },
          address1: {
            required: true
          },
          city: {
            required: true
          },
          postal: {
            required: true,
            length:5,
            pattern:'digits',
            USZipcode:true
          },
          region: {
            required: true
          },
          mobileNumber: {
            required: true
          }
        }
        return validation;
    },

    getRegistration1Validation : function() {
       var validation = {
          firstName: {
            required: true
          },
          lastName: {
            required: true
          },
          password: {
            required: true
          },
          password2: {
            equalTo: 'password',
            required: true
          }
        }
        return validation;
    },

    getRegistration2Validation : function() {
       var validation = {
          address1: {
            required: true
          },
          postal: {
            required: true,
            length:5,
            pattern:'digits',
            USZipcode:true
          },
          city: {
            required: true
          },
          region: {
            required: true
          },
          mobileNumber: {
            required: true
          }
        }
        return validation;
    },

    render: function(eventName) {
      this.$el.html(this.template());
      this.$(".form-area .email").hide();  // only show on guest checkout

      if (this.type == app.userInfoList.model.SHIPPING){
        this.$('.same-as-text').html("My shipping address is the same address I used during my registration.");
        this.$('#same-as').addClass(app.userInfoList.model.REGISTRATION); // same as reg
        this.$('.header-text .type').html("shipping");
        if (app.isAuthUser() === false) {  // if not logged in then we hide this, as can't same as to anything, and show email, as we need their email for checkout!
          this.$(".address-same-as").hide();
          this.$(".form-area .email").show();
        }
      } else if (this.type == app.userInfoList.model.BILLING){
        this.$('.same-as-text').html("My billing address is the same as my shipping address.");
        this.$('#same-as').addClass(app.userInfoList.model.SHIPPING); // same as ship
        this.$('.header-text .type').html("billing");
      }

      this.$('#user-information').addClass(this.type);
      this.binder.bind(this.model, this.el);
      this.toggleInputs(this.model.get('sameAs'));
      return this.el;
    },

    events : {
      "click #registration-1 .submit #next-button" : "doRegistration2",
      "click #registration-2 .submit #next-button" : "doFinishRegistration",
      "click .next #next-step-button" : "nextStep",
      "change input[name=sameAs]" : "priorInfoPopulate"
    },

    // populate form based on previously entered user info - get source state from checkbox class that was set in render
    priorInfoPopulate : function(ev) {
      var sourceModel = null;
      var type = this.$('#same-as').attr('class');

      if (this.$("#same-as").attr('checked') != 'checked') {
        this.model.clear();
        this.model.set('type', this.type); // don't wipe out this info state
      } else {
        // disable inputs
        sourceModel = app.userInfoList.where({type:type})[0];
        $.extend(this.model.attributes, sourceModel.attributes);
        this.model.set('sameAs', true); // don't wipe out this info state
        this.model.set('type', this.type); // don't wipe out this info state
        this.model.set('id', app.userInfoList.length+1); // not persisted in db yet,  give client arbitrary id
        this.binder.bind(this.model, this.el);
      }

      this.toggleInputs(this.model.get('sameAs'));
    },

    toggleInputs : function(isDisabled) {
      var inputs = this.$(':input');

      this.$(':input').each(function (i, el) {
          if ($(el).attr('id') == 'same-as') return;
          isDisabled==true?$(el).attr('disabled', 'disabled'):$(el).removeAttr('disabled');
      });

    },


    doRegistration2 : function(ev) {
      // lazy init the validation so first time through validation messages aren't shown immediately
      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true});
      this.model.validate();
      var isValid = this.model.isValid();
      if (isValid === true) {
        app.userInfoList.add(this.model); // need id field to be populated and remain the same through workflow
        if (this.nav == null){
          app.navigate("registration2", true);
        } else {
          app.navigate("registration2/"+this.nav, true);
        }
      }
    },


    doFinishRegistration : function(ev) {
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

      // lazy init the validation so first time through validation messages aren't shown immediately
      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true});

      this.model.validate();
      var isValid = this.model.isValid();
      if (isValid === true) {
         app.userInfoList.add(this.model); // need id field to be populated and remain the same through workflow
         app.utils.setAjaxLoading(ev.currentTarget);
         this.model.sync("create", this.model, {success:this.createRegSuccessCallback, error:this.createRegErrorCallback, wait:true, url:'rest/user_info/'  });
         //this.model.save(this.model, {success:this.updateSuccessCallback, error:this.updateErrorCallback});
      }

    },

    createRegSuccessCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($("#next-button"));
      app.userInfoList.reset(); // clear out the old  - refresh from server

      app.session.doSync(model);  //  a sync override pre

      var nav = "registrationSuccess";
      if (this.nav != null) {
        nav = nav + "/"+ this.nav;
      }

      app.navigate(nav, true);
      options = {navigateTo:nav}; // for now the default view
    },

    createRegErrorCallback : function (model, response, options){
      app.utils.unsetAjaxLoading($("#next-button"));
      if (response.status == 409) {
        app.showError('User with email ' +model.get('email')+ ' already exists');
      } else {
        app.showError('could not create new user at this time');
      }
    },


    nextStep : function(ev) {
      this.model.validation.email.required = this.isEmailRequired(this.type);

      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true});
      this.model.validate();
      var isValid = this.model.isValid();
      if (isValid === false) return;

      if (this.type == app.userInfoList.model.SHIPPING){
        this.model.sync("create", this.model, {success:this.saveShippingSuccessCallback, error:this.saveShippingErrorCallback, wait:true, url:'rest/user_info/session/'});
      } else if (this.type == app.userInfoList.model.BILLING){
        this.model.sync("create", this.model, {success:this.saveBillingSuccessCallback, error:this.saveBillingErrorCallback, wait:true, url:'rest/user_info/session/'});
      }
    },


    // if auth user and on shipping page, not required
    // if on shipping page and guest, then it is required
    // if billing page, not required
    isEmailRequired : function (type) {
      if (type === app.userInfoList.model.BILLING) {
        return false;
      }

      if (type === app.userInfoList.model.SHIPPING && app.isAuthUser() === true) {
        return false;  // email already in scope
      }
      return true;

    },


    saveShippingSuccessCallback : function(model, response, options){
        app.userInfoList.add(new UserInfoModel(model));
        app.navigate("billing", true);
    },

    saveShippingErrorCallback : function(model, response, options){
        app.showError("could not save your Shipping info at this time");
    },


    saveBillingSuccessCallback : function(model, response, options){
        app.userInfoList.add(new UserInfoModel(model));
        app.navigate("reviewCart", true);
    },

    saveBillingErrorCallback : function(model, response, options){
      app.showError("could not save your Billing info at this time");
    },


    getTitle : function() {
        if (this.type == app.userInfoList.model.REGISTRATION){
          if (this.page === 'reg1') {
            return "Registration Step 1";
          } else if (this.page === 'reg2'){
            return "Registration Step 2";
          }
        } else if (this.type == app.userInfoList.model.SHIPPING){
          return "Shipping Information";
        } else if (this.type == app.userInfoList.model.BILLING){
          return "Billing Information";
        }
    }


  });

  return userInfoView;
});