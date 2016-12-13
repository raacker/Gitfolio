var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repositorySchema = new Schema({
  userID: String,
  repoURL: String,
  repoName: String,
  description: String
});

module.exports = mongoose.model('repository', repositorySchema);
