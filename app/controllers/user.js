var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function (req, res) {
  var method = req.method;
  if (req.method === 'POST') {
    var username = req.param('username');
    var password = req.param('password');
    User
      .findOne({username: username})
      .exec(function (err, user) {
        if (err) return;
        if (user && user.auth(password)) {
          req.session.userId = user.id
          res.redirect('/');
        } else {
          res.render('login');
        }
      });
  } else {
    res.render('login');
  }
};

exports.logout = function (req, res) {
  delete req.session.userId;
  res.redirect('/login');
}

exports.signup = function (req, res) {
  var method = req.method;

  if (req.method === 'POST') {
    var username = req.param('username');
    var password = req.param('password');

    User
      .findOne({username: username})
      .exec(function (err, user) {
        if (err) return;
        if (!user) {
          new User({username: username, password: password}).save();
          res.redirect('/login');
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.render('editSignup');
  }
};
