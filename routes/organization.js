// routes/organization.js

module.exports = function(app, Organization)
{
  app.get('/api/organizations/:organization_id', function(req, res) {
    Organization.find({_id: req.params.organization_id}, function(err, organization) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!organization) {
        return res.status(404).json({ error: 'Organization not found'});
      }

      res.json(organization);
    });
  });

  app.get('/api/organizations/userID/:userID', function(req, res) {
    Organization.find({userID: req.params.userID}, function(err, organizations) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!organizations) {
        return res.status(404).json({ error: 'Organization not found'});
      }

      res.json(organizations);
    });
  });

  app.post('/api/organizations', function(req, res) {
    var organization = new Organization();
    organization.userID = req.body.userID;
    organization.name = req.body.name;
    organization.iconURL = req.body.iconURL;

    organization.save(function(err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
      }
      res.json({result: 1});
    });
  });

  app.put('/api/organizations/:organization_id', function(req, res) {
    Organization.findById(req.params.organization_id, function(err, organization) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!organization) {
        return res.status(404).json({ error: 'Organization not found'});
      }

      if(req.body.name) {
        organization.name = req.body.name;
      }
      if(req.body.iconURL) {
        organization.iconURL = req.body.iconURL;
      }

      organization.save( function(err) {
        if(err) {
          return res.status(500).json({error: 'Failed to update'});
        }
        res.json({message: 'Organization Updated'});
      });
    });
  });

  app.delete('/api/organizations/:organization_id', function(req, res) {
    Organization.remove( {_id: req.params.organization_id}, function(err, output) {
      if(err) {
        return res.status(500).json({error: 'Database Failure'});
      }
      res.status(204).end();
    });
  });
}
