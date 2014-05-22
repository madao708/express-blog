var post = require('../app/controllers/post');
var user = require('../app/controllers/user');
var auth = require('./middlewares/authorization');

module.exports = function (app) {
  // post
  app.get('/', post.list);
  app.get('/p/:pId', post.show);
  app.get('/p/:pId/edit', post.edit);
  app.post('/p/:pId/edit', post.edit);
  app.post('/p/:pId/delete', post.delete);

  app.get('/t/:tName', post.getTagPosts);

  app.get('/new', auth.requireLogin, post.new);
  app.post('/new', auth.requireLogin, post.new);

  app.get('/feed', post.feed)

  // user
  app.get('/signup', user.signup);
  app.post('/signup', user.signup);

  app.get('/login', auth.requireNotLogin, user.login);
  app.post('/login', auth.requireNotLogin, user.login);
  app.get('/logout', auth.requireLogin, user.logout);
}
