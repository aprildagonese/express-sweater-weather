var pry = require('pryjs');
var nodeFetch = require('node-fetch');
var dotenv = require('dotenv').config();
// eval(pry.it);
 class GeoLocationService(location) {
   constructor() {
   }

   getLatLong(location) => {
     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.googleApiKey}`)
     .then(response => {return response.json()})
     .then(jsonData => {return jsonData.results[0].geometry.location})
     .catch(error => {console.error({ error }))};
   }
 }

module.exports = GeoLocationService;
