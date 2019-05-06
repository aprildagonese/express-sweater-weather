var express = require('express');
var favoritesRouter = express.Router();
var pry = require('pryjs');
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var UserLocation = require('../../../models').UserLocation;
var FavoritesForecast = require('../../../pojos/favoritesForecast');
var fetch = require('node-fetch');

/* GET favorite listing. */
favoritesRouter.get("/", function(req, res, next) {
  User.findOne({ where: { api_key: req.body.api_key } })
  .then(user => {
    if (user === null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify("Invalid API Key"))
    } else {
      console.log({ FavoritesForecast })
      FavoritesForecast(user, res)
      .then(favorites => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).send(JSON.stringify({favorites}))
      }).catch(console.error)
    }
  })
  .catch(error => {
    res.status(401).send(JSON.stringify("Could not retrieve butts"))
  });
});


/* POST favorite listing. */
favoritesRouter.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  User.findOne({ where: { api_key: req.body.api_key } })
  .then(user => {
    if (user === null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify("Invalid API Key"))
    } else {
      getFavorite(user, req.body.location, res)
    } })
  .catch(error => {
    res.status(401).send(JSON.stringify("Could not retrieve favorite"))
  });
});

async function getFavorite(user, location, res) {
  try {
    Location.findOrCreate({ where: {name: location} })
    .then(([location, created]) => {
      return UserLocation.findOrCreate({ where: {UserId: user.id, LocationId: location.id} })
    })
    .then(([userLocation, created]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({"message":`${location} has been added to your favorites`}))
    })
  } catch (error) {
    res.status(401).send(JSON.stringify("Could not store favorite at this time"))
  }
}

module.exports = favoritesRouter;
