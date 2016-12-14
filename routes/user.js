// routes/user.js

module.exports = function(app, UserProfile)
{
  // GET ALL Users or single user
  app.get('/api/userProfiles/:userID', function(req,res){
    UserProfile.findOne({userID: req.params.userID}, function(err, user) {
      if(err) {
        return res.status(500).json({error: err});
      }
      if(!user) {
        return res.status(404).json({error: 'User Profile not found'});
      }
      res.json(user);
    });
  });

  // CREATE UserProfile
  app.post('/api/userProfiles', function(req, res){
    if(req.body.userID == null) {
      return res.status(500).json("wrong access point");
    }
    UserProfile.findOne({userID: req.body.userID}, function(err, user) {
      if(err) {
        return res.status(500).json({error: err});
      }
      if(user) {
        return res.status(404).json({error: 'User Account already exists'});
      } else {
        var userProfile = new UserProfile();
        userProfile.userID = req.body.userID;
        userProfile.userBio = " ";
        userProfile.userLinkedInLink = " ";

        console.log(userProfile.userID);
        userProfile.save(function(err) {
          if (err) {
            console.error(err);
            res.json({result: 0});
            return;
          }
          console.log("User registered successfully : " + userProfile.userID);
          res.render("main" , {
            repositories: [],
            organizations: [],
            skillSets: [],
            activityCards: [],
            userID: req.body.userID,
            userLinkedInLink: [],
            login: true
          });
        });
      }
    });
  });

  app.post('/api/userProfiles/edit', function(req, res) {
    res.status(200);
    console.log(req.body.userID);
    UserProfile.findOne({userID: req.body.userID}, function(err, user) {
      if(req.body.userBio) {
        user.userBio = req.body.userBio;
      }
      if(req.body.userLinkedInLink) {
        user.userLinkedInLink = req.body.userLinkedInLink;
      }

      user.save(function(err) {
        if(err) {
          return res.status(500).json({error: 'Failed to update'});
        }
        res.redirect("/main");
      })
    });
  });

  // UPDATE UserProfile
  app.put('/api/userProfiles', function(req, res){
    UserProfile.findById(req.query.userID, function(err, user) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!user) {
        return res.status(404).json({ error: 'User Profile not found'});
      }

      if(req.query.userLinkedInLink) {
        user.userLinkedInLink = req.query.userLinkedInLink;
      }
      if(req.query.userBio) {
        user.userBio = req.query.userBio;
      }

      user.save(function(err) {
        if(err) {
          return res.status(500).json({error: 'Failed to update'});
        }
        res.json({message: 'UserProfile Updated'});
      });
    });
  });

  // DELETE UserProfile
  app.delete('/api/userProfiles/:userID', function(req, res){
    UserProfile.remove({ userID: req.params.userID}, function(err, output) {
      if(err) {
        return res.status(500).json({error: 'Database Failure'});
      }
      res.status(204).end();
    });
  });
}
