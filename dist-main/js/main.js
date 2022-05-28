require([
    'jquery', 'underscore', 'backbone', 'scrollable',
     'tms', 'sliderkit', 'sliderkitdelay', 'sliderkitcounter', 'sliderkittimer', 'sliderkitimagefx', 'mousewheel', 'customScrollbar',
    '../common/models/cart/cart-item-collection', '../common/models/user-info/user-info-model', '../common/models/user-info/user-info-collection',
    '../common/models/user-info/payment-info-model',
    '../common/models/contact/contact-model', '../common/models/user-info/credentials-model',
    '../common/models/device-exchange/device-model', '../common/models/device-exchange/device-collection',
    '../common/views/contact/contact', '../common/views/home/login',
    '../common/views/device-exchange/device-list', '../common/views/device-exchange/landing', '../common/views/device-exchange/add', '../common/views/device-exchange/search', '../common/views/device-exchange/search-results',
    'views/home/home', 'views/app/getapp', '../common/views/home/privacy-policy', '../common/views/home/privacy-policy-coppa', '../common/views/home/terms-conditions',
    'views/safety/safety', 'views/car/car', 'views/stickers/stickers', 'views/track/track',
    'views/cart/cart', '../common/views/cart/review-cart', '../common/views/cart/payment', '../common/views/cart/final-order','../common/views/cart/receipt',
    'views/user/user-info', 'views/user/registration', '../common/views/user/registration-success',
    '../common/views/error-page',
    '../common/utils', '../common/catalog', '../common/session', '../common/zones'
  ],
  
  function ($, _, Backbone, scrollable,
    tms, sliderkit, sliderkitdelay, sliderkitcounter,  sliderkittimer, sliderkitimagefx, mousewheel, customScrollbar,
    CartItemList,  UserInfoModel, UserInfoList,
    PaymentInfoModel,
    ContactModel, CredentialsModel,
    DeviceModel, DeviceList,
    ContactView, LoginView,
    DeviceListView, DeviceLandingView, AddDeviceView, SearchDeviceView, DeviceSearchResultsView,
    HomeView, GetappView, PrivacyPolicyView, PrivacyPolicyCoppaView, TermsConditionsView,
    SafetyView, CarView, StickersView, TrackView,
    CartView, ReviewCartView, PaymentView, FinalOrderView, ReceiptView,
    UserInfoView, RegistrationView, RegistrationSuccessView,
    ErrorPageView,
    utils, catalog, session, zones) {

  var AppRouter = Backbone.Router.extend({
      
      initialize : function () {
        this.appMode = "main";
        this.utils = utils;
        this.catalog = catalog;
        this.session = session;
        this.zones = zones;

        this.messageArea = $('.message-area');
        this.cartItemList = new CartItemList();
        this.userInfoList = new UserInfoList();
        this.credentialsModel = new CredentialsModel();
        this.paymentInfo = null;
        this.deviceList = new DeviceList();  // clear out aggressively as this is a long list
        this.paypalErrorList;


        Backbone.Validation.configure({
          labelFormatter: 'label'
        });


        this.session.syncToServer(this.startRouterCallback, this.showError);
      },

      startRouterCallback : function(){
        Backbone.history.start();
      },


      routes : {
        // Define some URL routes, called by app.navigate
        // Default

        'home' : 'showHome',
        'stickers' : 'showStickers',
        'track' : 'showTrack',
        "checkout" : "doCheckout",
        "reg_checkout" : "doRegisteredCheckout",
        "shipping" : "showShippingInfo",
        "billing" : "showShippingInfo",
        "reviewCart" : "showReviewCart",
        "payment/:errors" : "showPaymentInfo",
        "payment" : "showPaymentInfo",
        "finalOrder" : "showFinalOrder",
        "receipt/:id/:code" : "showReceipt",
        "registration1/:email" : "showRegistration1",
        "registrationSuccess" : "showRegistrationSuccess",
        "registrationSuccess/:nav" : "showRegistrationSuccessNav",
        "login" : "doCheckout", // same workflow as doCheckout
        "logout" : "doLogout",
        'getapp' : 'showGetApp',
        'device' : 'showDevice',
        'addDevice' : 'showAddDevice',
        'searchDevices' : 'showDeviceSearchResults',
        'searchDeviceResults' : 'showDeviceSearchResults',
        'safety' : 'showSafety',
        'blog' : 'showBlog',
        'contactus' : 'showContactUs',
        'cart' : 'showCart',
        'car' : 'showCar',
        'carPackage' : 'showCarPackage',
        "contact" : "showContact",
        "policy" : "showPolicy",
        "policycoppa" : "showCoppaPolicy",
        "terms" : "showTerms",
        "error" : "showErrorPage",
        '*actions' : 'showHome'
      },

      showHome : function () {
        this.swapContentView(new HomeView());
        this.setActiveTab('home');
        $('.slider')._TMS({
          show:0,
          pauseOnHover:true,
          prevBu:false,
          nextBu:false,
          playBu:false,
          duration:1000,
          preset:'fade',
          pagination:true,
          pagNums:false,
          slideshow:90000,
          numStatus:false,
          banners:'fromRight',
          waitBannerAnimation:false,
          progressBar:false
        });
        //$('.slider').css('overflow', 'visible');
      },

      showStickers : function () {
        this.swapContentView(new StickersView());
        this.setActiveTab('stickers');
      },

      showTrack : function () {
        this.swapContentView(new TrackView());
        this.setActiveTab('track');
      },

      showCar : function (showPackage) {
        var carView = new CarView(showPackage);
        this.swapContentView(carView);
        this.setActiveTab('car');
      },

      showCarPackage : function(){
        this.showCar(true);
        window.scrollTo(0, 800);

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
          this.setActiveTab('cart');
          var shipping = this.userInfoList.where({type:this.userInfoList.model.SHIPPING})[0];

          if (shipping == null || shipping.get('id') == null || shipping.get('email') == null){ // make sure this is complete
            this.showShippingInfo();
          } else {
            this.showReviewCart();
          }
      },


      showRegistrationSuccess : function () {
        this.swapContentView(new RegistrationSuccessView());
      },

      showRegistrationSuccessNav : function (nav) {
        this.swapContentView(new RegistrationSuccessView(nav));
      },


      showCart : function () {
        var cartView = new CartView({collection:this.cartItemList});
        this.swapContentView(cartView);
        this.setActiveTab('cart');
        this.cartItemList.updateTotals();
      },

      showShippingInfo : function () {
        this.setActiveTab('cart');
        var view = new UserInfoView();
        this.swapContentView(view);
      },


      showReviewCart : function() {
        this.setActiveTab('cart');
        this.swapContentView(new ReviewCartView());
      },

      showPaymentInfo : function(hasErrors) {
          // check for cart with items in it
          if (this.cartItemList.length === 0) {
            this.showMessage('You must have items in your cart to continue');
            return;
          }

          this.setActiveTab('cart');
          this.swapContentView(new PaymentView({model:new PaymentInfoModel()}, hasErrors));
      },

      showFinalOrder : function() {
        this.setActiveTab('cart');
        this.swapContentView(new FinalOrderView());
      },

      showReceipt : function(id, code) {
        this.setActiveTab('cart');
        this.swapContentView(new ReceiptView(id, code));
      },


      showGetApp : function () {
        this.setActiveTab('getapp');
        this.swapContentView(new GetappView());
      },

      showPolicy : function() {
        this.setActiveTab('home');
        this.swapContentView(new PrivacyPolicyView());
      },


      showCoppaPolicy : function() {
        this.setActiveTab('home');
        this.swapContentView(new PrivacyPolicyCoppaView());
      },

      showTerms : function() {
        this.setActiveTab('home');
        this.swapContentView(new TermsConditionsView());
      },

      showRegistration1 : function(email) {
        var view = new RegistrationView(email);
        this.swapContentView(view);
      },

      showDevice : function () {
        this.setActiveTab('device');
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

      showSafety : function (){
        this.setActiveTab('safety');
        this.swapContentView(new SafetyView());
      },

      showBlog : function() {
        app.navigate("home", false);
        window.document.location.href = "http://blog.appfxtoys.com";
      },

      showContactUs : function () {
        this.swapContentView(new ContactView({model:new ContactModel()}));
        this.setActiveTab('contactus');
      },

       showErrorPage : function () {
        this.setActiveTab('home');
        this.swapContentView(new ErrorPageView());
       },


      setActiveTab : function(id){
        // first remove current active, just blank them all out, then set current to active
        $('#navLinks a').removeClass('active');
        $('.cartlink').removeClass('active');
        if (id === 'cart'){
          $('.cartlink').addClass('active');
        } else {
          $('#navLinks #'+id).addClass('active');
        }
      },

      swapContentView : function(view) {
        this.hideMessage();

        if (this.currentView != null) {
          this.currentView.remove();
        }

        this.currentView = view;
        $('#page-content').html(view.render());

        if (typeof view['postRender']==='function') view.postRender();
        window.scrollTo(0, 0);
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
        if (msgList == null || msgList.length == null){
          msgList = [];
          msgList.push('Sorry an unexpected error has occurred');
        }

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

      setLoginUserArea : function (name) {
        var userNameArea = $('#header .user-name-area .user-name');
        var logoutLink = $('#header .user-name-area #logout');
        var loginLink = $('#header .user-name-area #login');

        if (name === ""){
          userNameArea.hide();
          logoutLink.hide();
          loginLink.show();
        } else {
          userNameArea.show();
          logoutLink.show();
          loginLink.hide();
        }
        $(".name", this.userNameArea).html(name);
      },

      doLogout : function(){
          this.session.removeServerSession();
          this.cartItemList.updateHeaderTotal();
          this.setLoginUserArea("");
          this.showHome(new HomeView());
      },


      loadTemplate : function(mainHtml, mobileHtml){
        return _.template(mainHtml);
      }


    });
  

  window.app = new AppRouter();
  //Backbone.history.start();

  
}); // End require
