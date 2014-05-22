exports.requireLogin = function (req, res, next) {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
}

exports.requireNotLogin = function (req, res, next) {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
}
