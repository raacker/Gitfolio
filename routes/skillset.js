// routes/skillset.js

module.exports = function(app, SkillSet)
{
  app.get('/api/skillSets/:skillSet_id', function(req, res) {
    SkillSet.find({_id: req.params.skillSet_id}, function(err, skillSet) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!skillSet) {
        return res.status(404).json({ error: 'SkillSet not found'});
      }

      res.json(skillSet);
    });
  });

  app.get('/api/skillSets/userID/:userID', function(req, res) {
    SkillSet.find({userID: req.params.userID}, function(err, skillSets) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!skillSets) {
        return res.status(404).json({ error: 'SkillSet not found'});
      }

      res.json(skillSets);
    });
  });

  app.post('/api/skillSets', function(req, res) {
    var skillSet = new SkillSet();
    skillSet.userID = req.body.userID;
    skillSet.skillName = req.body.skillName;
    skillSet.iconURL = req.body.iconURL;
    skillSet.level = req.body.level;

    skillSet.save(function(err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
      }
      res.json({result: 1});
    });
  });

    app.post('/api/skillSets/add', function(req, res) {
      SkillSet.findOne({userID: req.body.userID, skillName: req.body.skillName}, function(err, repository) {
        if(err) {
            return res.status(500).json({ error: 'Database Failure'});
          }
          if(repository) {
            return res.status(404).json({ error: 'Skill is already exist'});
          } else {
            var skillSet = new SkillSet();
            skillSet.userID = req.body.userID;
            skillSet.skillName = req.body.skillName;
            skillSet.skillType = req.body.skillType;
            skillSet.iconURL = req.body.iconURL;
            skillSet.level = req.body.level;

            skillSet.save(function(err) {
              if (err) {
                console.error(err);
                res.json({result: 0});
                return;
              }
              console.log("Skill Added successfully : " + skillSet.userID + " " +
                           skillSet.skillName);
              res.redirect("/main");
            });
          }
        })
    });


  app.put('/api/skillSets/:skillSet_id', function(req, res) {
    SkillSet.findById(req.params.skillSet_id, function(err, skillSet) {
      if(err) {
        return res.status(500).json({ error: 'Database Failure'});
      }
      if(!skillSet) {
        return res.status(404).json({ error: 'SkillSet not found'});
      }

      if(req.body.skillName) {
        skillSet.skillName = req.body.skillName;
      }
      if(req.body.iconURL) {
        skillSet.iconURL = req.body.iconURL;
      }
      if(req.body.level) {
        skillSet.level = req.body.level;
      }

      skillSet.save( function(err) {
        if(err) {
          return res.status(500).json({error: 'Failed to update'});
        }
        res.json({message: 'SkillSet Updated'});
      });
    });
  });

  app.delete('/api/skillSets/:skillSet_id', function(req, res) {
    SkillSet.remove( {_id: req.params.skillSet_id}, function(err, output) {
      if(err) {
        return res.status(500).json({error: 'Database Failure'});
      }
      res.status(204).end();
    });
  });
}
