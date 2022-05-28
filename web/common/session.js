define([
  'jquery',
  'underscore',
  'backbone',
  '../common/models/user-info/credentials-model'

], function($, _, backbone, CredentialsModel){


  // sync the app main data structures.  These should be called before a page render the screen is updated with
  // the latest information
  var session = {

      // get the current session state from the server and set the app main data structures to it
      // asynchronous: calls specified callbacks on completion
      // Executed on page refresh only
      syncToServer : function(successCallback, errorCallback) {
        var $this = this;
        $.ajax({
              type: "GET",
              url: "rest/session"
            }).done(function(response, param, param2 ) {
                $this.doSync(response);
                successCallback();
            }).error(function(response, param, param2) {
                successCallback(); // init router anyway
                errorCallback(("warning, could not sync your session data at this time"));
            });
      },

      // set the app main data structures to the specified parameter
      // synchronous, expected to be called from a ajax success (or error) callback
      syncToSpecified : function (sessionData){

      },

      // expect a json object as sessionData
      // adds items as models to app lists
      doSync : function (sessionData){
        if (sessionData.catalog != null){
          app.catalog.itemList = sessionData.catalog;
        } else {
          app.showError('Could not sync item catalog, adding items may be an issue');
        }

        if (sessionData.zones != null){
          app.zones.zonesList = sessionData.zones;
        } else {
          app.showError('Could not sync zip code data, calculating shipping costs may be an issue');
        }

        if (sessionData.zoneRates != null){
          app.zones.zoneRateList = sessionData.zoneRates;
        } else {
          app.showError('Could not sync zip code data, calculating shipping costs may be an issue');
        }


        if (sessionData.cartDataList != null){
          for (var i =0; i<sessionData.cartDataList.length; i++){
            app.cartItemList.add(sessionData.cartDataList[i]);
          }
        }

        if (sessionData.userInfoDataList != null){
          for (var i =0; i<sessionData.userInfoDataList.length; i++){
            app.userInfoList.add(sessionData.userInfoDataList[i]);
          }
        }

        if (sessionData.credentialsData != null){
          app.credentialsModel = new CredentialsModel(sessionData.credentialsData);
          app.credentialsModel.updateHeader(sessionData.credentialsData.email);
        }

      },

      // expect object as backbone model
//      doModelSync : function(sessionData){
//        if (sessionData.get())
//
//      }


      removeServerSession : function(){
        var $this = this;
        $.ajax({
              type: "DELETE",
              url: "rest/session"
            }).done(function(response, param, param2 ) {
                app.utils.unsetAjaxLoading('');
                $this.removeClientSession(response);
            }).error(function(response, param, param2) {
                app.utils.unsetAjaxLoading('');
                errorCallback(("warning, could not log out completely, please refresh your browser"));
            });
      },


      // clean up client persistent storage data-structures
      removeClientSession : function(){
          app.credentialsModel = new CredentialsModel();
          app.userInfoList.reset();
          app.cartItemList.reset();
      }


  };

  return session;

});

