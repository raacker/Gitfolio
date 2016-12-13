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
  }
});

router.get("/preference", function(req, res) {
  res.render("preference");
});

router.get("/main", function(req, res) {
    res.status(200);
    var repository = require('../models/Repository');
    var organization = require('../models/Organization');
    var skillSet = require('../models/SkillSet');
    var activityCard = require('../models/ActivityCard');

    repository.count({}, function(err, repositoryCount) {
      repository.find({}, function(err, repositoryResult) {
        organization.count({}, function(err, organizationCount) {
          organization.find({}, function(err, organizationResult) {
            skillSet.count({}, function(err, skillSetCount){
              skillSet.find({}, function(err, skillSetResult) {
                activityCard.count({}, function(err, activityCardCount) {
                  activityCard.find({}, function(err, activityCardResult) {
                    res.render("main" , {
                      repositories: repositoryResult,
                      organizations: organizationResult,
                      skillSets: skillSetResult,
                      activityCards: activityCardResult
                    });
                  });
                })
              });
            });
          });
        });
      });
    });
});

router.get("/login", function(req, res) {
  res.render("login", {
    client_id: client_id
  });
});

//
// router.post("/", function(req, res) {
//   res.render();
// });

module.exports = router;
