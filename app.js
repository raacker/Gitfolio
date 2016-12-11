// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8081;

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("Connected to MongoDB Server");
});

mongoose.connect('mongodb://localhost:27017/Gitfolio');

var UserProfile = require('./models/UserProfile');
var Repository = require('./models/Repository');

// [CONFIGURE ROUTER]
var repositoryRouter = require('./routes/repository')(app, Repository);
var userRouter = require('./routes/user')(app, UserProfile);

});
