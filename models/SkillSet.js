var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillSetSchema = new Schema({
  userID: String,
  skillName: String,
  iconURL: String,
  level: Number
});

module.exports = mongoose.model('skillSet', skillSetSchema);
