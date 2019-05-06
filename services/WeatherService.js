var pry = require('pryjs');
var fetch = require('node-fetch');
var dotenv = require('dotenv').config();

 class WeatherService {

   async getForecast(lat, long, location) {
     var response = await fetch(`https://api.darksky.net/forecast/${process.env.darkSkyApiKey}/${lat},${long}`)
     var data = await response.json()
     var currently = data.currently
     var hourly = data.hourly
     var daily = data.daily
     return {location, currently, hourly, daily}
   };
 }

module.exports = WeatherService;
