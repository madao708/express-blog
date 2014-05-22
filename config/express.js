var express = require('express'),
    path = require('path'),
    exhbs = require('express3-handlebars');

module.exports = function (app, config) {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../app/views/'));
  app.engine('hbs', exhbs({
    layoutsDir: 'app/views',
    defaultLayout: 'layout',
    extname: '.hbs'
  }))
  app.set('view engine', 'hbs');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.sessionSecret
  }));
  app.use(express.csrf());
  app.use(function (req, res, next) {
    res.locals.token = req.session ? req.csrfToken() : '';
    res.locals.userId = req.session.userId || '';
    next();
  });
  app.use(app.router);
  app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
  app.use(express.static(path.join(__dirname, '../public')));

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
}
