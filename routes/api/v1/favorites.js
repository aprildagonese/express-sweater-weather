var express = require('express');
var favoritesRouter = express.Router();
var pry = require('pryjs');
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var UserLocation = require('../../../models').UserLocation;
var fetch = require('node-fetch');
// eval(pry.it);

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
    };
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
