var express = require('express');
var favoritesRouter = express.Router();
var pry = require('pryjs');
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var UserLocation = require('../../../models').UserLocation;
var fetch = require('node-fetch');
// eval(pry.it);

/* POST favorite listing. */
loginRouter.post("/", function(req, res, next) {
  User.findOne({ where: { api_key: req.body.api_key } })
  .then(user => {
    if (user === null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify("Invalid API Key")
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(user.api_key));
    };
  });
});

module.exports = favoritesRouter;
