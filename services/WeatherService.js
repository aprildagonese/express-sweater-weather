var pry = require('pryjs');
var nodeFetch = require('node-fetch');
// eval(pry.it);
 class WeatherService {
   constructor(lat, long) {
     this.latLong = this.getLatLong(location)
   }

   getLatLong(location) {
     new darkSkyService(location)
   }
 }

module.exports = WeatherService;
