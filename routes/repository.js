// routes/repository.js

module.exports = function(app, Repository)
{
  app.get('/api/repositories/:repository_id', function(req, res) {
    Repository.find({_id: req.params.repository_id}, function(err, repository) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!repository) {
        return res.status(404).json({ error: 'Repository not found'});
      }

      res.json(repository);
    });
  });

  app.get('/api/repositories/userID/:userID', function(req, res) {
    Repository.find({userID: req.params.userID}, function(err, repositories) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!repositories) {
        return res.status(404).json({ error: 'Repository not found'});
      }

      res.json(repositories);
    });
  });

  app.post('/api/repositories', function(req, res) {
    var repository = new Repository();
    repository.userID = req.body.userID;
    repository.repoURL = req.body.repoURL;
    repository.description = req.body.description;

    var uri = url.parse(req.body.repoURL).pathname;
    var urlParsed = uri.split('/');
    repository.repositoryName = urlParsed[2];

    repository.save(function(err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
      }
      
      res.redirect("/main?login=" + req.body.login + "&userID=" + req.body.userID);
    });
  });

  app.put('/api/repositories/:repository_id', function(req, res) {
    Repository.findById(req.params.repository_id, function(err, repository) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!repository) {
        return res.status(404).json({ error: 'Repository not found'});
      }

      if(req.body.repoURL) {
        var uri = url.parse(req.body.repoURL).pathname;
        var urlParsed = uri.split('/');
        repository.repositoryName = urlParsed[2];
      }
      if(req.body.description) {
        repository.description = req.body.description;
      }

      repository.save( function(err) {
        if(err) {
          return res.status(500).json({error: 'Failed to update'});
        }
        res.json({message: 'Repository Updated'});
      });
    });
  });

  app.delete('/api/repositories/:repository_id', function(req, res) {
    Repository.remove( {_id: req.params.repository_id}, function(err, output) {
      if(err) {
        return res.status(500).json({error: 'Database Failure'});
      }
      res.status(204).end();
    });
  });
}
