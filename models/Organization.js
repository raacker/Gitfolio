var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationsSchema = new Schema({
  userID: String,
  name: String,
  iconURL: String
});

module.exports = mongoose.model('organization', organizationsSchema);
