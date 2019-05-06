'use strict';

var pry = require('pryjs');
var fetch = require('node-fetch');
var GeolocationService = require('../services/GeolocationService');
var WeatherService = require('../services/WeatherService');

 class Forecast {

   forecast(location) {
     return new Promise((resolve, reject) => {
       new GeolocationService(location).getLatLong()
       .then(latLong => {
         var lat = latLong.lat
         var long = latLong.long
         var location = latLong.location
         return new WeatherService().getForecast(lat, long, location)
       })
       .then(forecast => {
         var location = forecast.location
         var currently = forecast.currently
         var hourly = forecast.hourly
         var daily = forecast.daily
         resolve({location, currently, hourly, daily})
       })
       .catch(error => {
         console.log("No good forecast")
       })
     })
   }

 }

module.exports = Forecast;
