var express = require('express');
var forecastRouter = express.Router();
var fetch = require('node-fetch');
var Forecast = require('../../../pojos/forecast');
var User = require('../../../models').User;

/* GET forecast listing. */
forecastRouter.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let user = await User.findOne({
    where: { api_key: req.body.api_key }
  })
  if (user === null) {
    console.log("invalid user")
    res.status(401).send(JSON.stringify("Invalid API key"))
  } else {
    getForecast(res, req.query.location)
  }
});

async function getForecast(res, location) {
  try {
    var forecast = await new Forecast()
    var forecastData = await forecast.forecast(location)
    res.status(201).send(JSON.stringify(forecastData))
    } catch (error) {
      res.status(401).send(JSON.stringify("Could not retrieve forecast"))
    }
}

module.exports = forecastRouter;
