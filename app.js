// [LOAD PACKAGES]
var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var http         = require('http');
var routes       = require('./routes');
var db           = mongoose.connection;
var engine       = require('ejs');
var fs           = require('fs');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var github       = require('octonode');
var client       = github.client();

//var client_id     = "a9673603ce17a0b961f0";
//var client_secret = "7d5cabad241b54e7d75ade79249f5f3c1396cedb";

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8081;

app.set("views", __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var createSession = function createSession() {
  return function(req, res, next) {
    if(!req.session.login) {
      req.session.login = 'logout';
    }
    next();
  };
};

// [CONFIGURE APP TO USE bodyParser]
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session( {
  key: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  secret: 'secret',
  cookie: {
    maxAge: 600000
  }
}));
app.use(createSession());

app.use("/", require("./routes/index"));
app.use("/preference", require("./routes/index"));
app.use("/main", require("./routes/index"));
app.use("/login", require("./routes/index"));

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
