// paths here are relative to shared view dir - context of 'this' - unless defined as globals in config.js
define([
  'jquery',
  'underscore',
  'backbone',
  '../../models/user-info/credentials-model',
  'text!templates/home/login.html'
], function($, _, backbone, Credentials, loginHtml){

  var loginView = Backbone.View.extend({

    initialize: function(nav) {
        _.bindAll(this, 'loginSuccessCallback', 'loginErrorCallback');

        this.template = _.template(loginHtml);
        // todo: skip this page if user is auth'd
        this.model = new Credentials();
        this.nav = nav;

        Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true });
    },

    render: function(eventName) {

        this.$el.html(this.template());
        return this.el;
    },

    postRender : function(){
//      if (app.cartItemList.length === 0){
//        this.$('#guest-area').hide();
//      }
    },

    events : {
      "click #login-button" : "login",
      "click #register-button" : "register",
      "click #guest-button" : "guest"
    },

    getValidation: function(){
        var validation= {
          password: {
            required: true
          },
          email: {
            required: true,
            pattern: 'email'
          },
          email_new: {
            required: true,
            pattern: 'email'
          }
        }
        return $.extend({},validation);  // return a copy
    },


    getTitle : function() {
      return "Customer Login";
    },

    login : function(ev) {
      ev.preventDefault();
      // auth user
      // on success navigate to review cart, set cookie (server), set header label
      // on fail, show error message
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call

      var validation = this.getValidation();
      delete validation.email_new; // remove validation rules that do not apply to this view action
      this.model.validation = validation;
      var email = this.$('.email').val();
      var password = this.$('.password').val();

      //var credentials = new Credentials({email:email});
      this.model.set("email", email);
      this.model.set("password", password);

      this.model.validate();
      var isValid = this.model.isValid();

      if (isValid === false) return;

      app.utils.setAjaxLoading(ev.currentTarget);
      var result = this.model.fetch({success:this.loginSuccessCallback, error: this.loginErrorCallback}); // reuse the auth routine from the main app page - sets cart and user info

    },



    loginSuccessCallback : function(model, response, options){
      app.utils.unsetAjaxLoading($('#login-button'));
      var nav = "reg_checkout"; // default


//      options = {navigateTo:nav};
      var session = {};
      session = model.attributes;
      app.session.doSync(session);
      app.setLoginUserArea(model.get("email"));

      if (this.nav != null){
        nav = this.nav;
      }

      app.navigate(nav, true);
    },

    loginErrorCallback : function(model, xhr, options){
      app.utils.unsetAjaxLoading($('#login-button'));
      app.showMessage('user name password incorrect');
    },



    register : function(ev) {
      ev.preventDefault();
      if (app.utils.isAjaxLoading(ev.currentTarget)) return;  // do nothing if this form is currently in an ajax call
      var email = this.$('.email_new').val();
      this.model.set("email_new", email);

      var validation = this.getValidation();
      delete validation.email;
      delete validation.password;
      this.model.validation = validation;

      this.model.validate();
      var isValid = this.model.isValid();

      if (isValid === false) return;

      var $this = this;

      app.utils.setAjaxLoading(ev.currentTarget);
      $.ajax({
            type: "GET",
            url: "rest/login/avail/" + email
          }).done(function(response, param) {
            app.utils.unsetAjaxLoading($('#register-button'));
            if (response == "AVAIL"){
              if ($this.nav != null && $this.nav != ""){
                app.navigate("registration1/"+email+"/"+$this.nav, true);  // from device exchange reg
              } else {
                app.navigate("registration1/"+email, true);  // user reg flow step 1
              }
            } else if (response == "NOT_AVAIL") {
              app.showError("Sorry, this username already exists in the system.");
            }
          }).error(function(response, param) {
              app.utils.unsetAjaxLoading($('#register-button'));
              app.showError("Sorry, the system encountered an error, please try again later.");
          });
    },

    guest : function(ev) {
      ev.preventDefault();
      app.navigate("shipping", true);
    }

  });

  return loginView;
});