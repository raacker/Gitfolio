var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activityCardSchema = new Schema({
  userID: String,
  activityURL: String,
  activityName: String,
  repositoryName: String,
  description: String,
  cardType: String,
  complexityLevel: Number,
  importanceLevel: Number
});

module.exports = mongoose.model('activityCard', activityCardSchema);
