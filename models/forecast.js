var pry = require('pryjs');
var nodeFetch = require('node-fetch');
var WeatherService = require('../services').WeatherService;
// eval(pry.it);
 class Forecast {
   constructor(location) {
     getLatLong(location)
   }

   getLatLong(location) {
     var service = new GeolocationService(location)
     this.lat = service.getLatLong(location)
     this.long = service.getLatLong(location)
   }

   forecast() {
     new WeatherService(this.lat, this.long)
   }
 }

module.exports = Forecast;
