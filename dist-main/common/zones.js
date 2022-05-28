define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, backbone){

  var zones= {

    zonesList : [],
    zoneRateList : [],


    getZoneForZip : function(zip) {
      // we are only interest in the first 3 digits
      zip = zip.substring(0,3);
      var zipAsInt = parseInt(zip);
      for (var i=0;i<this.zonesList.length; i++){
        if (zipAsInt >= this.zonesList[i].lowZip && zipAsInt <= this.zonesList[i].highZip){
          return this.zonesList[i].zone;
        }
      }

      return -1;
    },

    getPriceByZone : function(zone, isMultipleCars){
      for (var i=0;i<this.zoneRateList.length; i++){
        if (this.zoneRateList[i].zone === zone) {
          return isMultipleCars === true ? this.zoneRateList[i].costMultipleCars : this.zoneRateList[i].costSingleCar;
        }
      }
      return -1;
    },

    getPriceForZip : function(zip, isMultipleCars){
      var zone = this.getZoneForZip(zip);
      if (zone === -1){
        return -1;
      }
      return this.getPriceByZone(zone, isMultipleCars);
    }


  };

  return zones;

});

