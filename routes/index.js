var fs        = require('fs');
var mongoose  = require('mongoose');
var url       = require('url');
var express   = require("express");
var router    = express.Router();
var session   = require('express-session');
var Client    = require('node-rest-client').Client;
var db        = mongoose.connection;
var github    = require('octonode');
var client;

router.get("/", function(req, res) {
  res.status(200);
  if(req.session.login == 'login') {
    res.redirect("/main");
  } else {
    res.render("search");
  }
});

router.get("/preference", function(req, res) {
  res.render("preference");
});

router.get("/main", function(req, res) {
  res.render("main");
});

router.get("/login", function(req, res) {
  res.render("login");
})

router.get("/callback", function (req, res) {
  var session_code = request.env['rack.request.query_hash']['code']

  var args = {
    data: {client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
          code: session_code, accept: json},
   headers: {"Content-Type": "application/json"}
  };

  var result = client.post('https://github.com/login/oauth/access_token', args,
                           function( data, response) {
                             console.log(data);
                             console.log(response);
                           });

  var access_token = JSON.parse(result)['access_token'];
  client = github.client(access_token);

  client.get('/user', {}, function(err, status, body, headers) {
    console.log(body);
  });
});

router.post("/", function(req, res) {
  res.render();
});

//
// exports.index = function(req, res) {
//   res.status(200);
//   res.render('index', {
//     title: 'Haven Kim'
//   });
// };
//
// exports.search = function(req, res) {
//   res.status(200);
//   res.render(
//
//   );
// };
//
// exports.login_post = function(req, res) {
//   res.status(200);
//
// };
//
// exports.preference = function(req, res) {
//   res.status(200);
//
// };

module.exports = router;
