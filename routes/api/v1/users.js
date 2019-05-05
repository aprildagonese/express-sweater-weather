var express = require('express');
var router = express.Router();
var pry = require('pryjs');
var User = require('../../../models').User;
var fetch = require('node-fetch');
const hat = require('hat');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
// eval(pry.it);

/* POST users listing. */
router.post("/", function(req, res, next) {
  if (req.body.password === req.body.password_confirmation) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      api_key: hat()
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(user.api_key));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send("User not created");
    });

  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("This didn't work"));
  };
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
