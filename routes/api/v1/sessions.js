var express = require('express');
var loginRouter = express.Router();
var pry = require('pryjs');
var User = require('../../../models').User;
var fetch = require('node-fetch');
// eval(pry.it);

/* POST login listing. */
loginRouter.post("/", function(req, res, next) {
  User.findOne({ where: { email: req.body.email } })
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

module.exports = loginRouter;
