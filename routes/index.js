var fs        = require('fs');
var mongoose  = require('mongoose');
var url       = require('url');
var express   = require("express");
var router    = express.Router();
var session   = require('express-session');
var db        = mongoose.connection;

router.get("/", function(req, res) {
  res.status(200);
  if(req.session.login != 'login') {
    res.redirect("/search");
  } else {
    res.render("welcome", {
      login: req.session.login
    });
  }
});

router.get("/preference", function(req, res) {
  res.render("preference");
});

router.get("/search", function(req, res) {
  res.render("search");
});

router.get("/login", function(req, res) {
  res.render("login");
})

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
