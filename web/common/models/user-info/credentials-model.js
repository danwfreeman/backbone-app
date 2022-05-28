define(
['jquery', 'underscore', 'backbone'],

function($, _, Backbone) {

    var Credentials = Backbone.Model.extend({

        urlRoot: "rest/login/",
        defaults: {
            "email": "",
            "password" : "",
            "token":""
        },

        labels: {
            email : "Email",
            password : "Password"
        },

        initialize : function(){
        },

        updateHeader : function () {
          app.setLoginUserArea(this.get("email"));
        },

        sync: function(method, model, options){
          if (model.get('token') != null && model.get('token') != ''){
            options.url = 'rest/login/un/'+model.get("email")+'/token/'+model.get("token");
          } else {
            options.url = 'rest/login/un/'+model.get("email")+'/pw/'+model.get("password");
          }

          Backbone.sync(method, model, options);
        },

        isAuthed : function(){
          if (this.get("email") == null || this.get("email") == ""){
            return false;
          }
          return true;
        }
    });

    return Credentials;
});