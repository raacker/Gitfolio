// routes/activityCard.js
var github    = require('octonode');
var client    = github.client();
var url       = require('url');

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
    activityCard.activityURL = req.body.activityURL;
    activityCard.description = req.body.description;
    activityCard.complexityLevel = req.body.complexityLevel;
    activityCard.importanceLevel = req.body.importanceLevel;

    var uri = url.parse(req.body.activityURL).pathname;
    var urlParsed = uri.split('/');
    activityCard.repositoryName = urlParsed[2];
    activityCard.cardType = urlParsed[3];

    if(activityCard.cardType == "pull") {
      var ghpr = client.pr(urlParsed[1] + "/" + urlParsed[2], urlParsed[4]);
      ghpr.info(function(err, data, headers) {
        activityCard.activityName = data.title;
        activityCard.save(function(err) {
          if (err) {
            console.error(err);
            res.json({result: 0});
          }
          res.redirect('/main');
        });
      });
    }
  });

  app.put('/api/activityCards/:activityCard_id', function(req, res) {
    Organization.findById(req.params.activityCard_id, function(err, activityCard) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!activityCard) {
        return res.status(404).json({ error: 'ActivityCard not found'});
      }

      if(req.body.activityURL) {
        activityCard.activityURL = req.body.activityURL;

        var uri = url.parse(req.body.activityURL).pathname;
        var urlParsed = uri.split('/');
        activityCard.repositoryName = urlParsed[2];
        activityCard.cardType = urlParsed[3];

        if(activityCard.cardType == "pull") {
          var ghpr = client.pr(urlParsed[1] + "/" + urlParsed[2], urlParsed[4]);
          ghpr.info(function(err, data, headers) {
            activityCard.activityName = data.title;
            // activityCard.save(function(err) {
            //   if (err) {
            //     console.error(err);
            //     res.json({result: 0});
            //   }
            //   res.redirect('/main');
            // });
          });
        }
      }
      if(req.body.description) {
        activityCard.description = req.body.description;
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
        res.redirect('/main');
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
