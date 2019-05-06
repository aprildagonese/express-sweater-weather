var pry = require('pryjs');
var fetch = require('node-fetch');
var dotenv = require('dotenv').config();
// eval(pry.it);
class GeolocationService {
  constructor(location) {
    this.location = location
  };

  getLatLong () {
    return new Promise((resolve, reject) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${process.env.googleApiKey}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        var lat = data.results[0].geometry.location.lat
        var long = data.results[0].geometry.location.lng
        var location = data.results[0].formatted_address
        // eval(pry.it)
        resolve({lat, long, location})
      })
      .catch(error => {
        console.log("No geolocation")
      })
    })
  };
  //
  // async getLatLong () {
  //   let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${process.env.googleApiKey}`)
  //   let data = await response.json();
  //   let lat = data.results[0].geometry.location.lat
  //   let long = data.results[0].geometry.location.lng
  //   let location = data.results[0].formatted_address
  //   return {lat, long, location}
  // };
}

module.exports = GeolocationService;
