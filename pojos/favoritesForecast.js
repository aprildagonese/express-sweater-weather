'use strict';

var pry = require('pryjs');
var fetch = require('node-fetch');
var GeolocationService = require('../services/GeolocationService');
var WeatherService = require('../services/WeatherService');
var UserLocation = require('../models').UserLocation;
var Location = require('../models').Location;

const getFavorites = (user, res) => {
   return UserLocation.findAll({ where: { UserId: user.id } })
   .then(favorites => {
      return Promise.all(favorites.map(userLocation => {
       return forecast(userLocation)
     }))
   })
   .catch(error => {
     console.error(error)
     res.setHeader("Content-Type", "application/json");
     res.status(401).send(JSON.stringify("Could not retrieve favorites"))
   });
}

const forecast = (userLocation) => {
  return getLatLongFromUserLocation(userLocation)
  .then(latLong => {
   return getForecastData(latLong)
  })
  .then(forecast => {
   const { location, currently } = forecast
   const locationForecast = { location, currently }
   return locationForecast
  })
  .catch(error => {
   console.log("Couldn't get latLong")
  })
}

const getLatLongFromUserLocation = (userLocation) => {
  return Location.findOne({ where: { id: userLocation.LocationId }})
    .then(location => {
      return getGeolocationService(location.name)
    })
}

const getGeolocationService = name => {
  return new GeolocationService(name).getLatLong()
}

const getForecastData = latLong => {
  const { lat, long, location } = latLong
  return new WeatherService().getForecast(lat, long, location)
}

module.exports = getFavorites;
