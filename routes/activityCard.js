// routes/activityCard.js

module.exports = function(app, ActivityCard)
{
  app.get('/api/activityCards/:activityCard_id', function(req, res) {
    activityCard.find({_id: req.params.activityCard_id}, function(err, activityCard) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!activityCard) {
        return res.status(404).json({ error: 'ActivityCard not found'});
      }

      res.json(activityCard);
    });
  });

  app.get('/api/activityCards/userID/:userID', function(req, res) {
    ActivityCard.find({userID: req.params.userID}, function(err, activityCards) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!activityCards) {
        return res.status(404).json({ error: 'ActivityCard not found'});
      }

      res.json(activityCards);
    });
  });

  app.post('/api/activityCards', function(req, res) {
    var activityCard = new ActivityCard();
    activityCard.userID = req.body.userID;
    activityCard.iconURL = req.body.iconURL;
    activityCard.description = req.body.description;
    activityCard.cardType = req.body.cardType;
    activityCard.complexityLevel = req.body.complexityLevel;
    activityCard.importanceLevel = req.body.importanceLevel;

    activityCard.save(function(err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
      }
      res.redirect('/main');
    });
  });

  app.put('/api/activityCards/:activityCard_id', function(req, res) {
    Organization.findById(req.params.activityCard_id, function(err, activityCard) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!activityCard) {
        return res.status(404).json({ error: 'ActivityCard not found'});
      }

      if(req.body.description) {
        activityCard.description = req.body.description;
      }
      if(req.body.iconURL) {
        activityCard.iconURL = req.body.iconURL;
      }
      if(req.body.cardType) {
        activityCard.cardType = req.body.cardType;
      }
      if(req.body.complexityLevel) {
        activityCard.complexityLevel = req.body.complexityLevel;
      }
      if(req.body.importanceLevel) {
        activityCard.importanceLevel = req.body.importanceLevel;
      }

      activityCard.save( function(err) {
        if(err) {
          return res.status(500).json({error: 'Failed to update'});
        }
        res.json({message: 'ActivityCard Updated'});
      });
    });
  });

  app.delete('/api/activityCards/:activityCard_id', function(req, res) {
    ActivityCard.remove( {_id: req.params.activityCard_id}, function(err, output) {
      if(err) {
        return res.status(500).json({error: 'Database Failure'});
      }
      res.status(204).end();
    });
  });
}
