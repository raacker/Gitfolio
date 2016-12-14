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
  res.render("preference", {
    userID: req.userID
  });
});

router.get("/main", function(req, res) {
    res.status(200);
    if(req.query.userID == null) {
      return res.status(404).json({error: "Unexpected access"});
    }

    var repository = require('../models/Repository');
    var organization = require('../models/Organization');
    var skillSet = require('../models/SkillSet');
    var activityCard = require('../models/ActivityCard');
    var userProfile = require('../models/UserProfile');


    userProfile.findOne({userID: req.query.userID}, function(err, user) {
      if(err) {
        return res.status(500).json({error: err});
      }
      if(!user) {
        return res.status(404).json({error: 'User Profile not found'});
      }
      console.log(user);
    });
    repository.count({}, function(err, repositoryCount) {
      repository.find({userID: req.query.userID}, function(err, repositoryResult) {
        organization.count({}, function(err, organizationCount) {
          organization.find({userID: req.query.userID}, function(err, organizationResult) {
            skillSet.count({}, function(err, skillSetCount){
              skillSet.find({userID: req.query.userID}, function(err, skillSetResult) {
                activityCard.count({}, function(err, activityCardCount) {
                  activityCard.find({userID: req.query.userID}, function(err, activityCardResult) {
                    res.render("main" , {
                      repositories: repositoryResult,
                      organizations: organizationResult,
                      skillSets: skillSetResult,
                      activityCards: activityCardResult,
                      userID: req.query.userID,
                      userLinkedInLink: req.userLinkedInLink,
                      login: req.query.login
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

router.post("/main", function(req, res) {
    res.status(200);
    var UserProfile = require('../models/UserProfile');
    UserProfile.findOne({userID: req.body.userID}, function(err, user) {
      if(err) {
        return res.status(500).json({error: err});
      }
      if(!user) {
        var UserProfile = require('../models/UserProfile');
        var userProfile = new UserProfile();
        userProfile.userID = req.body.userID;
        userProfile.linkedInLink = req.body.userLinkedInLink;

        userProfile.save(function(err) {
          if (err) {
            console.error(err);
            res.json({result: 0});
            return;
          }
          res.render("main", {
            repositories: [],
            organizations: [],
            skillSets: [],
            activityCards: [],
            userID: req.body.userID,
            userLinkedInLink: null,
            login: true
          });
        });
      } else {
        return res.status(404).json({error: 'Username already registered'});
      }
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
