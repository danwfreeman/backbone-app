define(["jquery","underscore","backbone","modelBinder","../../../common/models/user-info/user-info-model","text!templates/user/registration.html"],function(e,t,n,r,i,s){var o=Backbone.View.extend({initialize:function(e){this.template=t.template(s),this.binder=new r,this.email=e},render:function(e){return this.model=app.userInfoList.where({type:"R"})[0],this.model==null&&(this.model=new i({type:"R"}),app.userInfoList.add(this.model)),this.model.set("email",this.email),this.$el.html(this.template(this.model.toJSON())),this.binder.bind(this.model,this.el),this.el},events:{"click #proceed":"doNextStep"},doNextStep:function(e){e.preventDefault(),Backbone.Validation.bind(this,{valid:app.utils.valid,invalid:app.utils.invalid,forceUpdate:!0}),this.model.validate();var t=this.model.isValid();t===!0&&(app.userInfoList.add(this.model),app.utils.setAjaxLoading(e.currentTarget),this.model.sync("create",this.model,{success:this.createRegSuccessCallback,error:this.createRegErrorCallback,wait:!0,url:"rest/user_info/"}))},createRegSuccessCallback:function(e,t,n){app.userInfoList.reset(),app.session.doSync(e),app.utils.hideGlobalLoader();var r="registrationSuccess";this.nav!=null&&(r=r+"/"+this.nav),app.navigate(r,!0),n={navigateTo:r}},createRegErrorCallback:function(e,t,n){app.utils.hideGlobalLoader(),t.status==409?app.showError("User with email "+e.get("email")+" already exists"):app.showError("could not create new user at this time")}});return o});