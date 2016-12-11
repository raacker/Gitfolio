var fs        = require('fs');
var mongoose  = require('mongoose');
var url       = require('url');

var db        = mongoose.connection;

exports.index = function(req, res) {
  res.status(200);
  res.render('index', {
    title: 'Haven Kim',
    url: url,
    login: req.session.login,
    username: req.session.username
  });
};

exports.search = function(req, res) {
  res.status(200);
  res.render(

  );
};

exports.login_post = function(req, res) {
  res.status(200);

};

exports.preference = function(req, res) {
  res.status(200);

};
