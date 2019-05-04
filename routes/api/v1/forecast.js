var express = require('express');
var forecastRouter = express.Router();
var pry = require('pryjs');
var nodeFetch = require('node-fetch');
var forecast = require('../../../models').Forecast;
// eval(pry.it);

/* GET forecast listing. */
forecastRouter.get("/", function(req, res, next) {
  .then(user => {
    if (req.body.password === user.password) {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(user.api_key))
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify("Well that didn't work."));
    };
  });
});

module.exports = forecastRouter;
