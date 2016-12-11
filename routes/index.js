var fs        = require('fs');
var mongoose  = require('mongoose');
var url       = require('url');
var express   = require("express");
var router    = express.Router();

var db        = mongoose.connection;

router.get("/", function(req, res) {
  res.render("welcome");
});

router.get("/preference", function(req, res) {
  res.render("preference");
});

router.get("/search", function(req, res) {
  res.render("search");
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
