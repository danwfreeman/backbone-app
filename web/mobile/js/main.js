require([], function($){
    require( [ "jqueryMobile" ], function() {
        jQuery.mobile.ajaxEnabled = false;
        jQuery.mobile.hashListeningEnabled = false;
        jQuery.mobile.linkBindingEnabled = false;
        jQuery.mobile.pushStateEnabled = false;
	});
} );

require([
    'jquery', 'jqueryMobile', 'underscore', 'backbone', 'scrollable', '../../common/utils', '../../common/catalog', '../../common/zones', '../../common/session',
    'views/main-menus/main-menu', 'views/home/appstore', '../../common/views/home/privacy-policy', '../../common/views/home/privacy-policy-coppa', '../../common/views/home/terms-conditions',
    'views/main-menus/header', 'views/home/home', 'views/home/home-wide',
    '../../common/views/contact/contact', 'views/safety/safety', 'views/cart/cart',
    'views/stock-car/fx-car', 'views/stock-car/details',
    'views/stickers/options', 'views/stickers/gallery', 'views/stickers/types', 'views/stickers/details',
    'views/tape/gallery', 'views/tape/types', 'views/tape/details',
    '../../common/views/device-exchange/device-list', '../../common/views/device-exchange/landing', '../../common/views/device-exchange/add', '../../common/views/device-exchange/search', '../../common/views/device-exchange/search-results',
    '../../common/views/home/login', 'views/user/user-info', '../../common/views/user/registration-success', '../../common/views/cart/review-cart', '../../common/views/cart/payment', '../../common/views/cart/final-order', '../../common/views/cart/receipt',
    '../../common/models/cart/cart-item-collection', '../../common/models/user-info/user-info-collection', '../../common/models/user-info/user-info-model', '../../common/models/user-info/payment-info-model',
    '../../common/models/contact/contact-model', '../../common/models/user-info/credentials-model',
    '../../common/models/device-exchange/device-model', '../../common/models/device-exchange/device-collection'
  ],
  
  function ($, Mobile, _, Backbone, scrollable, utils, catalog, zones, session,
    MainMenuView, AppStoreView, PrivacyPolicyView, PrivacyPolicyCoppaView, TermsConditionsView,
    HeaderView, HomeView, HomeWideView,
    ContactView, SafetyView, CartView,
    StockCarView, StockCarDetailsView,
    StickersOptionsView, StickersGalleryView, StickersTypesView, StickersDetailsView,
    TapeGalleryView, TapeTypesView, TapeDetailsView,
    DeviceListView, DeviceLandingView, AddDeviceView, SearchDeviceView, DeviceSearchResultsView,
    LoginView, UserInfoView, RegistrationSuccessView, ReviewCartView, PaymentView, FinalOrderView, ReceiptView,
    CartItemList, UserInfoList, UserInfoModel, PaymentInfoModel,
    ContactModel, CredentialsModel,
    DeviceModel, DeviceList) {

  var AppRouter = Backbone.Router.extend({
      
      initialize : function () {
        console.log("in main.js init");
        this.appMode = "mobile";
        this.isTempAuth = false;
        _.bindAll(this, 'loginSuccessCallback', 'loginErrorCallback', 'setOrientation', 'startRouterCallback', 'showError', ''); // set the 'this' scope on callback methods
        this.utils = utils;
        this.catalog = catalog;
        this.session = session;
        this.zones = zones;
        //this.resolveAuthUser();  // set credentials model from cookie and ajax lookup


        this.messageArea = $('.message-area');
        this.userNameArea = $('#header .user-name');
        this.loginLink = $('#header .login-link');
        this.logoutLink = $('#header .logout-link');
        this.cartItemList = new CartItemList();
        this.userInfoList = new UserInfoList();
        this.credentialsModel = new CredentialsModel();
        this.paymentInfo = null;
        this.deviceList = new DeviceList();  // clear out aggressively as this is a long list
        this.paypalErrorList;

        // disable landscape style sheet until an landscape event detected
        document.styleSheets[1].disabled = true;

        $(window).bind("orientationchange", this.setOrientation);


        this.initSetup();
        $("#tempAuth").hide();

        Backbone.Validation.configure({
          labelFormatter: 'label'
        });

        this.session.syncToServer(this.startRouterCallback, this.showError);

      },

      startRouterCallback : function(){
        Backbone.history.start();
      },

      initSetup : function(){

        $('#main-menu').html(new MainMenuView().render());  // bottom half of screen - stays static throughout workflow
        this.headerView = new HeaderView();
        $('#page-header').html(this.headerView.render());  // header section - stays static throughout workflow, not visible on home page
        this.setOrientation();
        this.showHome();
//        $('.scrollable').css({"width":'', "left":"", "margin-left":""});
//        $('.item, .item img').css("width",'');

      },


      setOrientation : function(event){
          if (event == null) { // likely navigated to url in landscape or portrait, query window object to determine orientation
            var h = window.outerHeight;
            var w = window.outerWidth;
            if (h > w) {
              this.mode = 'portrait';
            } else {
              this.mode = 'landscape';
            }
          } else {  // triggered from user rotation event, get from event object
            this.mode = event.orientation;
          }

          if (this.mode === 'landscape'){
            document.styleSheets[1].disabled = false;
          } else {
            document.styleSheets[1].disabled = true;
          }

          if (this.currentView != null && (this.currentView.id === 'home' || this.currentView.id === 'home-wide')){
            this.showHome();
          }
      },

      routes : {
        // Define some URL routes, called by app.navigate
        "appstore" : "showAppStoreLanding",
        "stockCar" : "showStockCarGallery",
        "stickers" : "showStickerGallery",
        "stickersGallery" : "showStickerGallery",
        "stickerTypes" : "showStickerTypes",
        "stickerDetails/:name" : "showStickerDetails",
        "fxCarDetails/:name" : "showFxCarDetails",
        "tape" : "showTapeGallery",
        "tapeTypes" : "showTapeTypes",
        "tapeDetails/:name" : "showTapeDetails",
        "appStore" : "showAppStore",
        "deviceExchange" : "showDeviceExchange",
        "addDevice" : "showAddDevice",
        "searchDevices" : "showSearchDevices",
        "searchDeviceResults" : "showDeviceSearchResults",
        "safety" : "showSafety",
        "blog" : "showBlog",
        "contactus" : "showContact",
        "home" : "defaultAction",
        "cart" : "showCart",
        "checkout" : "doCheckout",
        "reg_checkout" : "doRegisteredCheckout",
        "login/:nav" : "doCheckout", // same workflow as doCheckout
        "login" : "doCheckout", // same workflow as doCheckout
        "logout" : "doLogout",
        "registration1/:email" : "showRegistration1",
        "registration1/:email/:nav" : "showRegistration1Nav",
        "registration2" : "showRegistration2",
        "registration2/:nav" : "showRegistration2Nav",
        "registrationSuccess" : "showRegistrationSuccess",
        "registrationSuccess/:nav" : "showRegistrationSuccessNav",
        "shipping" : "showShippingInfo",
        "billing" : "showBillingInfo",
        "reviewCart" : "showReviewCart",
        "payment/:errors" : "showPaymentInfo",
        "payment" : "showPaymentInfo",
        "finalOrder" : "showFinalOrder",
        "receipt/:id/:code" : "showReceipt",
        "policy" : "showPolicy",
        "policycoppa" : "showCoppaPolicy",
        "terms" : "showTerms",
        // Default
        '*actions' : 'defaultAction'
      },

      goBack : function (ev) {
          ev.preventDefault();
          window.history.back();
      },

      showHome : function () {
        if (this.mode === 'landscape'){
          this.swapContentView(new HomeWideView());
        } else {
          this.swapContentView(new HomeView());
        }


        $("#page-header").hide();
        this.hideMessage();
        //this.messageArea.hide();
      },


      setLoginUserArea : function (name) {
        if (name === ""){
          this.userNameArea.hide();
          this.logoutLink.hide();
          this.loginLink.show();
        } else {
          this.userNameArea.show();
          this.logoutLink.show();
          this.loginLink.hide();
        }
        $(".name", this.userNameArea).html(name);
      },

      showAppStoreLanding : function() {
        this.swapContentView(new AppStoreView());
      },

      showSafety : function () {
        this.swapContentView(new SafetyView());
      },

      showBlog : function() {
        app.navigate("home", false);
        window.document.location.href = "http://blog.appfxtoys.com";
      },

      showContact : function () {
        this.swapContentView(new ContactView({model:new ContactModel()}));
      },


      showCart : function () {
        var cartView = new CartView({collection:this.cartItemList});
        this.swapContentView(cartView);
        this.cartItemList.updateTotals();
      },


      // route based on whether user is logged in or not
      doCheckout : function(nav) {
        if (this.credentialsModel.isAuthed()){
          this.doRegisteredCheckout();
        } else {
          this.swapContentView(new LoginView(nav));
        }
      },

      doRegisteredCheckout : function(){
          var shipping = this.userInfoList.where({type:this.userInfoList.model.SHIPPING})[0];
          if (shipping == null){
            this.showShippingInfo();
          } else {
            this.showReviewCart();
          }
      },

      // handle presentation stuff
      doLogout : function(){
          this.session.removeServerSession();
          this.cartItemList.updateHeaderTotal();
          this.setLoginUserArea("");
          this.showHome(new HomeView());
      },

      showDeviceExchange : function() {
        this.swapContentView(new DeviceLandingView());
      },

      showAddDevice : function() {
        this.swapContentView(new AddDeviceView({model:new DeviceModel()}));
      },

      showSearchDevices : function() {
        this.swapContentView(new SearchDeviceView());
      },

      showDeviceSearchResults : function(){
        this.swapContentView(new DeviceSearchResultsView());
      },

      showStockCarGallery : function() {
        this.swapContentView(new StockCarView());
        $(".fx-scrollable").scrollable();
      },

//      showStickerOptions : function() {
//        this.swapContentView(new StickersOptionsView());
//      },

      showStickerTypes : function() {
        this.swapContentView(new StickersTypesView());
      },

      showStickerGallery : function() {
        this.swapContentView(new StickersGalleryView());
        $(".fx-scrollable").scrollable();
      },

      showStickerDetails : function(name) {
        this.swapContentView(new StickersDetailsView(name));
      },

      showFxCarDetails : function(name) {
        this.swapContentView(new StockCarDetailsView(name));
      },

      showTapeGallery : function() {
        this.swapContentView(new TapeGalleryView());
        $(".fx-scrollable").scrollable();
      },

      showTapeTypes : function() {
        this.swapContentView(new TapeTypesView());
      },

      showTapeDetails : function(name) {
        this.swapContentView(new TapeDetailsView(name));
      },

      showRegistration1 : function(email) {
        var view = new UserInfoView(UserInfoModel.REGISTRATION, 'reg1', email);
        this.swapContentView(view);
      },

      showRegistration1Nav : function(email, nav){
        var view = new UserInfoView(UserInfoModel.REGISTRATION, 'reg1', email, nav);
        this.swapContentView(view);
      },

      showRegistration2 : function() {
        var view = new UserInfoView(UserInfoModel.REGISTRATION, 'reg2');
        this.swapContentView(view);
       },

      showRegistration2Nav : function(nav) {
        var view = new UserInfoView(UserInfoModel.REGISTRATION, 'reg2', null, nav);
        this.swapContentView(view);
      },

      showRegistrationSuccess : function () {
        this.swapContentView(new RegistrationSuccessView());
      },

      showRegistrationSuccessNav : function (nav) {
        this.swapContentView(new RegistrationSuccessView(nav));
      },


      showShippingInfo : function () {
        var view = new UserInfoView(UserInfoModel.SHIPPING);
        this.swapContentView(view);
      },

      showBillingInfo : function() {
        var view = new UserInfoView(UserInfoModel.BILLING);
        this.swapContentView(view);
      },

      showReviewCart : function() {
          this.swapContentView(new ReviewCartView());
          this.cartItemList.updateTotals();
      },

      showPaymentInfo : function(hasErrors) {
          // check for cart with items in it
          if (this.cartItemList.length === 0) {
            this.showMessage('You must have items in your cart to continue');
            return;
          }

          this.swapContentView(new PaymentView({model:new PaymentInfoModel()}, hasErrors));
      },

      showFinalOrder : function() {
        this.swapContentView(new FinalOrderView());
      },

      showReceipt : function(id, code) {
        this.swapContentView(new ReceiptView(id, code));
      },

      showPolicy : function() {
        this.swapContentView(new PrivacyPolicyView());
      },

      showCoppaPolicy : function() {
        this.swapContentView(new PrivacyPolicyCoppaView());
      },

      showTerms : function() {
        this.swapContentView(new TermsConditionsView());
      },

      defaultAction : function (actions) {
        this.showHome();
        $(".scrollable").scrollable().focus(); // some bug in here, won't scroll dots
      },

      swapContentView : function(view) {
        this.hideMessage();

        if (this.currentView != null) {
          this.currentView.remove();
        }

        this.currentView = view;
        $('#page-content').html(view.render());
        $("#page-header").show();
        if (typeof view['postRender']==='function') view.postRender();
        window.scrollTo(0, 0);
        this.headerView.setTitle(view.getTitle());
      },


      showMessage : function(msg) {
        window.scrollTo(0, 0);
        this.resetMessage();
        this.messageArea.show();
        $('.message', this.messageArea).html(msg);
      },

      hideMessage : function(){
        this.messageArea.hide();
      },

      showError : function(msg) {
        this.showMessage(msg);
        $('.message-area').addClass('error');
      },

      showWarning : function(msg) {
        this.showMessage(msg);
        $('.message-area').addClass('warning');
      },

      resetMessage : function(){
        $('.message-area').removeClass('error');
        $('.message-area').removeClass('warning');
      },


      showErrors : function(msgList) {
        if (msgList.length == null) return;

        window.scrollTo(0, 0);
        this.messageArea.show();

        var message = $('<ul>');
        for (var i=0; i<msgList.length; i++){
          message.append($('<li>' + msgList[i] + '</li>'));
        }

        $('.message', this.messageArea).empty();
        $('.message', this.messageArea).append(message);
        $('.message-area').addClass('error');

      },

      isAuthUser : function(){
        if (this.credentialsModel == null){
          return false;
        }
        return this.credentialsModel.isAuthed();
      },

      loadTemplate : function(mainHtml, mobileHtml){
        return _.template(mobileHtml);
      }

    });
  

  window.app = new AppRouter();
  //Backbone.history.start();

  
}); // End require
