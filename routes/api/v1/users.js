var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post("/", function(req, res, next) {
  require('crypto').randomBytes(48, function(err, buffer) {
    var token = buffer.toString('hex');
    });
  if req.body.password === req.body.password_confirmation {
    User.create({
            email: req.body.email,
            password: req.body.password,
            password_confirmation: req.body.password_confirmation,
            api_key: token
      })
      .then(user => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify(user.api_key));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
  } else {
    .then(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify(error));
    });
  };
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
