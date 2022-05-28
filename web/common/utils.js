define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, backbone){

  var util = {

    // return true if div is set to be loading an ajax call
    // if true is passed for setLoading, then also set this to a loading div
    isAjaxLoading : function(elem, setLoading) {
      if (($(elem)).hasClass('ajax-loading')) {
        return true;
      }

      if (setLoading != null && setLoading === true){
        this.setAjaxLoading(elem);
        return true;
      }
      return false;
    },

    setAjaxLoading : function (elem){
      ($(elem)).addClass('ajax-loading');
      if (app.appMode === 'main'){
        this.showGlobalLoader();
      }
    },

    unsetAjaxLoading : function (elem){
      ($(elem)).removeClass('ajax-loading');
      if (app.appMode === 'main'){
        this.hideGlobalLoader();
      }

    },

    showGlobalLoader : function(){
      app.hideMessage(); // so it's not in the way
      window.scrollTo(0, 0);
      $('.global-ajax-loading').show();
    },

    hideGlobalLoader : function(){
      $('.global-ajax-loading').hide();
    },


    padDecimal : function(dec){
      var len = 2;
      var chr = '0';
      //chr = chr || '0';
      dec = dec.toString();

      //if (!len) return dec;

      var p = dec.indexOf('.');

      if (p === -1){
        dec = dec + '.';
      }

      p = dec.indexOf('.');

      p = dec.length-p-1;

      for (var m = p; m < len; m++)
        dec += chr;

      return dec;
    },

    isZipValid : function(zip){
      if (app.zones.getPriceForZip(zip) === -1){
        return false;
      }
      return true;
    },


    valid: function(view, attr, selector) {
      var elem = view.$('[' + selector + '~=' + attr + ']');

      // message placement can be view/attr specific
      if (view.id != null && view.id === 'payment') {
        app.utils.paymentValid(attr, elem);
      } else if (view.id != null && view.id === 'device-exchange') {
        app.utils.deviceExchangeModalValid(attr, elem);
      } else {
        app.utils.genericValid(elem);
      }


    },

    invalid: function(view, attr, error, selector) {
      var elem = view.$('[' + selector + '~=' + attr + ']');

      // message placement can be view/attr specific
      if (view.id != null && view.id === 'payment') {
        app.utils.paymentInvalid(attr, elem, error);
      } else if (view.id != null && view.id === 'contact') {
        app.utils.contactInvalid(attr, elem, error);
      } else if (view.id != null && view.id === 'device-exchange') {
        app.utils.deviceExchangeModalInvalid(attr, elem, error);
      } else {
        app.utils.genericInvalid(elem, error);
      }
    },


    genericValid : function(elem) {
      if (elem.hasClass('invalid')){
        elem.removeClass('invalid')
        elem.next().remove();
      }
    },

    genericInvalid : function (elem, error) {
      if (elem.hasClass('invalid'))  {
        elem.next().remove(); // remove old error message
      }

      elem.addClass('invalid');

      elem.after($('<label/>', {
          class: 'invalid',
          text: error
      }));

    },

    paymentValid : function(attr, elem) {

      if (attr === 'expiryMonth'){
         div = $('#invalid-month-area');
      } else if (attr === 'expiryYear'){
         div = $('#invalid-year-area');
      } else {
        app.utils.genericValid(elem);
        return;
      }

      if (elem.hasClass('invalid')){
        elem.removeClass('invalid')
        div.empty();
      }

    },

    paymentInvalid : function(attr, elem, error) {
      var div = null;
      if (attr === 'expiryMonth'){
         div = $('#invalid-month-area');
      } else if (attr === 'expiryYear'){
         div = $('#invalid-year-area');
      } else {
        app.utils.genericInvalid(elem, error);
        return;
      }

      if (elem.hasClass('invalid'))  {
        div.empty() // remove old error message
      }

      elem.addClass('invalid');

     div.append($('<label/>', {
         class: 'invalid',
         text: error
      }));
    },

    contactInvalid : function(attr, elem, error) {
      var div = null;
      if (attr === 'agree_box'){
        div = $('#contact-us .error-message');
      }  else {
        app.utils.genericInvalid(elem, error);
        return;
      }
      elem.addClass('invalid');

     div.append($('<label/>', {
         class: 'invalid',
         text: error
      }));
    },

    deviceExchangeModalInvalid : function(attr, elem, error){
      if (attr !== 'email'){
        return
      }

      var elem = $('#contact-seller-dialog input[name='+attr+']').parent();

      if ($('#contact-seller-dialog input[name='+attr+']').siblings().empty()){
        elem.append($('<label/>', {
           class: 'invalid',
           text: error
        }));
      }

    },

    deviceExchangeModalValid : function(attr, elem) {
      if (attr !== 'email'){
        return
      }

      var elem = $('#contact-seller-dialog input[name='+attr+']').siblings();
      elem.remove();
    },


    getStickerDescription : function (itemNum){
      var name;
      if (itemNum === 'S10'){
        description = '<li>Name: AppFX Stickers</li><li>Size: 8" x 10"</li><li>Sticker count: 79</li><li>Sticker type: Glossy paper finish</li><li>Description: AppFX Sticker Sheet</li><li>Stickers are water-based</li><li>No mess; easy-application</li>';
      } else if (itemNum === 'S11'){
        description = '<li>Name: DC Labs Stickers</li><li>Size: 8" x 10"</li><li>Sticker count: 64</li><li>Sticker type: Glossy paper finish</li><li>Description: DC Labs Sticker Sheet</li><li>Stickers are water-based</li><li>No mess; easy-application</li>';
      } else if (itemNum === 'S12'){
        description = '<li>Name: Police Interceptor Stickers</li><li>Size: 8" x 10"</li><li>Sticker count: 58</li><li>Sticker type: Glossy paper finish</li><li>Description: Patrol Sticker Sheet</li><li>Stickers are water-based</li><li>No mess; easy-application</li>';
      } else if (itemNum === 'S13'){
        description = '<li>Name: Police Patrol Stickers</li><li>Size: 8" x 11"</li><li>Sticker count: 59</li><li>Sticker type: Glossy paper finish</li><li>Description: Interceptor Sticker Sheet</li><li>Stickers are water-based</li><li>No mess; easy-application</li>';
      }
      return description;
    },

    getStickerPDFName : function (itemNum){
      var name = '';
      if (itemNum === 'S10'){
        name = 'AppFX-race-appfx-stickers-spec.pdf';
      } else if (itemNum === 'S11'){
        name = 'AppFX-race-dclabs-stickers-spec.pdf';
      } else if (itemNum === 'S12'){
        name = 'AppFX-police-interceptor-stickers-spec.pdf';
      } else if (itemNum === 'S13'){
        name = 'AppFX-police-patrol-stickers-spec.pdf';
      }
      return name;
    }


  };

  return util;

});

