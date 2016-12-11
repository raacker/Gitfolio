// routes/user.js

module.exports = function(app, UserProfile)
{
  // GET ALL Users
  app.get('/api/userProfiles', function(req,res){
    UserProfile.find( function(err, users) {
      if(err) {
        return res.status(500).send({error: 'Database Failure'});
      }
      res.json(users);
    });
  });

  // GET SINGLE User
  app.get('/api/userProfiles/:userID', function(req, res){
    UserProfile.findOne({userID: req.params.userID}, function(err, user) {
      if(err) {
        return res.status(500).json({error: err});
      }
      if(!user) {
        return res.status(404).json({error: 'User Profile not found'});
      }
      res.json(user);
    })
  });

  // CREATE UserProfile
  app.post('/api/userProfiles', function(req, res){
    var userProfile = new UserProfile();
    userProfile.userID = req.body.userID;
    userProfile.userAuthKey = req.body.userAuthKey;
    userProfile.linkedInLink = req.body.userLinkedInLink;

    userProfile.save(function(err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });

  // UPDATE UserProfile
  app.put('/api/userProfiles/:userID', function(req, res){
    UserProfile.findById(req.params.userID, function(err, user) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!user) {
        return res.status(404).json({ error: 'User Profile not found'});
      }

      if(req.body.userAuthKey) {
        user.userAuthKey = req.body.userAuthKey;
      }
      if(req.body.userLinkedInLink) {
        user.userLinkedInLink = req.body.userLinkedInLink;
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
