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

var userID;

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

router.get("/search", function(req, res) {
  res.status(200);
  res.render("search");
});

router.get("/preference", function(req, res) {
  res.status(200);
  if(req.session.login == 'login') {
    console.log("enter to preference : " + req.session.userID);
    var repository = require('../models/Repository');
    var organization = require('../models/Organization');
    var skillSet = require('../models/SkillSet');
    repository.count({}, function(err, repositoryCount) {
      repository.find({userID: req.session.userID}, function(err, repositoryResult) {
        organization.count({}, function(err, organizationCount) {
          organization.find({userID: req.session.userID}, function(err, organizationResult) {
            skillSet.count({}, function(err, skillSetCount){
              skillSet.find({userID: req.body.userID}, function(err, skillSetResult) {
                res.render("preference", {
                  userID: req.session.userID,
                  repositories: repositoryResult,
                  organizations: organizationResult,
                  skillSets: skillSetResult
                });
              });
            });
          });
        });
      });
    });
  } else {
      return res.status(404).json({error: "Unexpected access"});
  }
});

router.post("/preference", function(req, res) {
  if(req.session.login == 'login') {
    console.log("enter to preference : " + req.session.userID);
    var repository = require('../models/Repository');
    var organization = require('../models/Organization');
    var skillSet = require('../models/SkillSet');
    repository.count({}, function(err, repositoryCount) {
      repository.find({userID: req.session.userID}, function(err, repositoryResult) {
        organization.count({}, function(err, organizationCount) {
          organization.find({userID: req.session.userID}, function(err, organizationResult) {
            skillSet.count({}, function(err, skillSetCount){
              skillSet.find({userID: req.body.userID}, function(err, skillSetResult) {
                res.render("preference", {
                  userID: req.session.userID,
                  repositories: repositoryResult,
                  organizations: organizationResult,
                  skillSets: skillSetResult
                });
              });
            });
          });
        });
      });
    });
  } else {
      return res.status(404).json({error: "Unexpected access"});
  }
});

router.get("/main", function(req, res) {
  res.status(200);
  if(req.session.login == 'login') {
    var repository = require('../models/Repository');
    var organization = require('../models/Organization');
    var skillSet = require('../models/SkillSet');
    var activityCard = require('../models/ActivityCard');
    var userProfile = require('../models/UserProfile');
    repository.count({}, function(err, repositoryCount) {
      repository.find({userID: req.session.userID}, function(err, repositoryResult) {
        organization.count({}, function(err, organizationCount) {
          organization.find({userID: req.session.userID}, function(err, organizationResult) {
            skillSet.count({}, function(err, skillSetCount){
              skillSet.find({userID: req.session.userID}, function(err, skillSetResult) {
                activityCard.count({}, function(err, activityCardCount) {
                  activityCard.find({userID: req.session.userID}, function(err, activityCardResult) {
                    userProfile.findOne({userID: req.session.userID}, function(err, user) {
                      res.render("main" , {
                        repositories: repositoryResult,
                        organizations: organizationResult,
                        skillSets: skillSetResult,
                        activityCards: activityCardResult,
                        userID: req.session.userID,
                        userBio: user.userBio,
                        userLinkedInLink: user.userLinkedInLink,
                        login: true
                      });
                    })
                  });
                })
              });
            });
          });
        });
      });
    });
  } else {
    return res.status(404).json({error: "Unexpected access"});
  }
});

router.post("/main", function(req, res) {
  res.status(200);

  if(req.body.userID == null) {
    return res.status(404).json({error: "Unexpected access"});
  }

  var repository = require('../models/Repository');
  var organization = require('../models/Organization');
  var skillSet = require('../models/SkillSet');
  var activityCard = require('../models/ActivityCard');
  var userProfile = require('../models/UserProfile');

  var userLinkedInLink;
  userProfile.findOne({userID: req.body.userID}, function(err, user) {
    if(err) {
      return res.status(500).json({error: err});
    }
    if(!user) {
      return res.status(404).json({error: 'User Profile not found'});
    }
    console.log("Sign in successfully : " + user.userID);
    userID = req.body.userID;
    userLinkedInLink = user.userLinkedInLink;
    req.session.login = 'login';
    req.session.userID = userID;
  });
  repository.count({}, function(err, repositoryCount) {
    repository.find({userID: req.session.userID}, function(err, repositoryResult) {
      organization.count({}, function(err, organizationCount) {
        organization.find({userID: req.session.userID}, function(err, organizationResult) {
          skillSet.count({}, function(err, skillSetCount){
            skillSet.find({userID: req.session.userID}, function(err, skillSetResult) {
              activityCard.count({}, function(err, activityCardCount) {
                activityCard.find({userID: req.session.userID}, function(err, activityCardResult) {
                  userProfile.findOne({userID: req.session.userID}, function(err, user) {
                    res.render("main" , {
                      repositories: repositoryResult,
                      organizations: organizationResult,
                      skillSets: skillSetResult,
                      activityCards: activityCardResult,
                      userID: req.session.userID,
                      userBio: user.userBio,
                      userLinkedInLink: user.userLinkedInLink,
                      login: true
                    });
                  })
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

router.get("/logout", function(req, res) {
  req.session.login = 'logout';
  req.session.userID = null;
  console.log("Signed out successfully");
  res.redirect("/");
});
//
// router.post("/", function(req, res) {
//   res.render();
// });

module.exports = router;
