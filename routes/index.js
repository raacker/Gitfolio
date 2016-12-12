var fs        = require('fs');
var mongoose  = require('mongoose');
var url       = require('url');
var express   = require("express");
var router    = express.Router();
var session   = require('express-session');
var Client    = require('node-rest-client').Client;
var db        = mongoose.connection;
var github    = require('octonode');
var client    = new Client();
var gitCli;

var client_id     = "a9673603ce17a0b961f0";
var client_secret = "7d5cabad241b54e7d75ade79249f5f3c1396cedb";

router.get("/", function(req, res) {
  res.status(200);
  if(req.session.login == 'login') {
    res.redirect("/main");
  } else {
    res.render("search");
    req.client.get('/users/raacker', {}, function(err, status, body, headers) {
      console.log(body);
    })
  }
});

router.get("/preference", function(req, res) {
  res.render("preference");
});

router.get("/main", function(req, res) {
  res.render("main");
});

router.get("/login", function(req, res) {
  res.render("login", {
    client_id: client_id
  });
})
//
// router.get("/callback", function (req, res) {
//   var session_code = url.parse(req.url).query.split('=')[1];
//
//   var args = {
//     data: {client_id: client_id, client_secret: client_secret,
//           code: session_code},
//    headers: {"Content-Type": "application/json"}
//   };
//
//   var result = client.post('https://github.com/login/oauth/access_token', args,
//                            function( data, response) {
//                              console.log(data);
//                              console.log(response);
//                            });
//
//   var access_token = result.access_token;
//   gitCli = github.client(access_token);
//
//   client.get('/user', {}, function(err, status, body, headers) {
//     console.log(body);
//   });
// });

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
