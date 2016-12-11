// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var http        = require('http');
var routes      = require('./routes');
var db          = mongoose.connection;
var engine      = require('ejs');
var fs          = require('fs');

// [CONFIGURE APP TO USE bodyParser]
app.set("views", __dirname + '/views');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/index"));

// app.get('/search', routes.search);
// app.get('/preference', routes.preference);

// app.get('/sign_up', routes.sign_up);
// app.post('/sign_up', function(req, res, next) {
//
// }, routes.sign_up_post);

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8081;

// [RUN SERVER]
var server = app.listen(port, function(){
  console.log("Express server has started on port " + port)

  db.on('error', console.error);
  db.once('open', function() {
    console.log("Connected to MongoDB Server");
  });

  mongoose.connect('mongodb://52.79.174.172:27017/Gitfolio');

  var UserProfile = require('./models/UserProfile');
  var Repository = require('./models/Repository');
  var SkillSet = require('./models/SkillSet');
  var Organization = require('./models/Organization');
  var ActivityCard = require('./models/ActivityCard');

  // [CONFIGURE ROUTER]
  var repositoryRouter = require('./routes/repository')(app, Repository);
  var userRouter = require('./routes/user')(app, UserProfile);
  var skillSetRouter = require('./routes/skillset')(app, SkillSet);
  var organizationRouter = require('./routes/organization')(app, Organization);
  var activityCardRouter = require('./routes/activityCard')(app, ActivityCard);
});
