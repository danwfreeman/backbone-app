define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'text!templates/user/address.html'

], function($, _, backbone, modelBinder, addressHtml){

  var userInfoView = Backbone.View.extend({

    initialize: function() {
      //_.bindAll(this, 'updateSuccessCallback', 'updateErrorCallback');
      this.binder = new modelBinder();
      this.template = _.template(addressHtml);
    },


    render : function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.binder.bind(this.model, this.el);

      this.type = this.model.get("type");

      if (this.type === "S") {
        this.$(".bldBox1").html("<br>");
      } else if (this.type === "B") {
        this.$(".address-type").html("Billing address is the same as Shipping address");
      }

      return this;
    },

    events : {
      "change input[name=sameAs]#top" : "priorInfoPopulate",
      "change input[name=sameAs]#bottom" : "toggleCheckbox"
    },

    toggleCheckbox : function(ev, el){
      var checked = this.$('#bottom').attr('checked');
      this.$("#top").attr('checked', checked === 'checked'?true:false);
      this.priorInfoPopulate();
    },

    // populate form based on previously entered user info - get source state from checkbox class that was set in render
    priorInfoPopulate : function(ev, el) {
      var sourceModel = null;

      if (this.$(".same-as").attr('checked') != 'checked') {
        this.model.validate = function(){}
        this.model.clear();
        this.model.set('type', this.type); // don't wipe out this info state
      } else {
        // disable inputs
        sourceModel = app.userInfoList.where({type:'S'})[0];
        $.extend(this.model.attributes, sourceModel.attributes);
        this.model.set('sameAs', true); // don't wipe out this info state
        this.model.set('type', 'B'); // don't wipe out this info state
        this.binder.bind(this.model, this.el);
      }

      this.toggleInputs(this.model.get('sameAs'));
    },

    populateFromModel : function (sourceModel){
        $.extend(this.model.attributes, sourceModel.attributes);
        this.model.set('type', 'S');
        this.binder.bind(this.model, this.el);
    },

    toggleInputs : function(isDisabled) {
      var inputs = this.$(':input');

      this.$(':input').each(function (i, el) {
          if ($(el).attr('class') == 'same-as') return;
          isDisabled==true?$(el).attr('disabled', 'disabled'):$(el).removeAttr('disabled');
      });

    },


    isValid : function() {
      this.model.validation.password.required = false;
      this.model.validation.password2.required = false;
      this.model.validation.password2.equalTo = "";
      Backbone.Validation.bind(this, {valid: app.utils.valid, invalid: app.utils.invalid, forceUpdate:true });
      this.model.validate();
      return this.model.isValid();
    }


  });

  return userInfoView;
});