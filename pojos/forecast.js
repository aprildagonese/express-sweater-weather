'use strict';

var pry = require('pryjs');
var nodeFetch = require('node-fetch');
var GeolocationService = require('../services/GeolocationService');
var WeatherService = require('../services/WeatherService');

 class Forecast {
   async forecast(location) {
     var geoService = await new GeolocationService(location);
     var latLong = await geoService.getLatLong();
     var lat = await latLong.lat
     var long = await latLong.long
     var location = await latLong.location

     var weatherService = await new WeatherService()
     var weather = await weatherService.getForecast(lat, long)

     var currently = weather.currently
     var hourly = weather.hourly
     var daily = weather.daily

     return {location, currently, hourly, daily}
   }
 }

module.exports = Forecast;
