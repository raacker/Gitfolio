var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userProfileSchema = new Schema({
  userID: String,
  userLinkedInLink: String
});

module.exports = mongoose.model('userProfile', userProfileSchema);
