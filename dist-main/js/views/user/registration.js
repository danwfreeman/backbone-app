define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  '../../../common/models/user-info/user-info-model',
  'text!templates/user/registration.html'
], function($, _, backbone, modelBinder, UserInfoModel, registrationHtml){

  var registrationView = Backbone.View.extend({

    initialize: function(email) {
        this.template = _.template(registrationHtml);
        this.binder = new modelBinder();
        this.email = email;
    },

    render: function(eventName) {
        this.model = app.userInfoList.where({type:'R'})[0];

        if (this.model == null) {
          this.model = new UserInfoModel({type:'R'});
          app.userInfoList.add(this.model);
        }
        this.model.set('email', this.email);

//        var validation = this.model.validation;
//        validation = $.extend(validation, {});
//        validation['password'] = {required:true};
//        validation['password2'] = {equalsTo:'password', required:true};
//        this.model.validation = validation;

        this.$el.html(this.template(this.model.toJSON()));
        this.binder.bind(this.model, this.el);
        return this.el;
    },

    events : {
      "click #proceed" : "doNextStep"
    },

    doNextStep : function(ev){
      ev.preventDefault();
      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true });
      this.model.validate();
      var isValid = this.model.isValid();
      if (isValid === true) {
        app.userInfoList.add(this.model); // need id field to be populated and remain the same through workflow
        app.utils.setAjaxLoading(ev.currentTarget);
        this.model.sync("create", this.model, {success:this.createRegSuccessCallback, error:this.createRegErrorCallback, wait:true, url:'rest/user_info/'  });
      }
    },

    createRegSuccessCallback : function(model, response, options){
      app.userInfoList.reset(); // clear out the old  - refresh from server

      app.session.doSync(model);  //  a sync override pre
      app.utils.hideGlobalLoader();

      var nav = "registrationSuccess";
      if (this.nav != null) {
        nav = nav + "/"+ this.nav;
      }

      app.navigate(nav, true);
      options = {navigateTo:nav}; // for now the default view
    },

    createRegErrorCallback : function (model, response, options){
      app.utils.hideGlobalLoader();
      if (response.status == 409) {
        app.showError('User with email ' +model.get('email')+ ' already exists');
      } else {
        app.showError('could not create new user at this time');
      }
    },



  });

  return registrationView;
});