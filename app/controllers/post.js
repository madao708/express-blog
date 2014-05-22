var Feed = require('feed');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.list = function (req, res) {
  var page = req.query.page ? parseInt(req.query.page) : 1;

  Post.count(function (err, count) {

    Post.find()
      .sort({'create_date': -1})
      .limit(5)
      .skip(5 * (page - 1))
      .exec(function (err, posts) {
        if (err) return;

        res.render('list', {
          title: 'this is my blog',
          hasPrevPage: page > 1,
          hasNextPage: page < Math.ceil(count/5),
          prevPage: page - 1,
          nextPage: page + 1,
          posts: posts 
        });
    });
  });
};

exports.new = function (req, res) {
  if (req.method === 'POST') {
    var title = req.param('title');
    var content = req.param('content');
    var tags = req.param('tags');

    new Post({
      title: title,
      content: content,
      tags: tags.split(',')
    })
    .save();
    res.redirect('/');
  } else {
    res.render('editPost');
  }
};

exports.show = function (req, res) {
  var pId = req.param('pId');
  Post 
    .findOne({_id: pId})
    .exec(function (err, post) {
      res.render('show', {
        post: post
      });
    });
};

exports.edit = function (req, res) {
  var pId = req.param('pId');

  if (req.method === 'POST') {
    var title = req.param('title');
    var content = req.param('content');
    var tags = req.param('tags');

    Post 
      .findByIdAndUpdate(
        {_id: pId},
        {$set: {
          title: title,
          content: content,
          tags: tags.split(',')
        }
      })
      .exec(function (err, post) {
        if (err) return res.send(err);
        res.redirect('/p/' + post.id);
      });
  } else {
    Post
      .findOne({_id: pId})
      .exec(function (err, post) {
        if (err) return res.send(err);
        res.render('editPost', {post: post});
      });
  }
};

exports.delete = function (req, res) {
  var pId = req.param('pId');

  if (req.method === 'POST') {
    Post.findByIdAndRemove(pId)
      .exec(function (err) {
        if (err) return res.send(err);
        res.redirect('/');
      });
  }
};

exports.getTagPosts = function (req, res) {
  var tName = req.param('tName');

  Post.find({tags: tName}, function (err, posts) {
    if (err) return res.send(err);

    res.render('list', {
      title: 'this is my blog',
      posts: posts 
    });
  });
};

exports.feed = function (req, res) {
  var feed = new Feed({
    title: 'test',
    description: 'hehe',
    link: 'http://localhost:3000',

    author: {
      name: 'scarlex',
      email: 'scarletsky1025@gmail.com',
      link: 'http://localhost:3000'
    }
  });

  Post.find()
    .sort('-create_date')
    .limit(5)
    .exec(function (err, posts) {
      if (err) return res.send(err);

      for (var index in posts) {
        feed.addItem({
          title: posts[index].title,
          link: '/p/' + posts[index].id,
          description:    posts[index].content.substring(0, 200),
          content: posts[index].content
        });
      }

      res.set('Content-Type', 'text/xml');
      res.send(feed.render('rss-2.0'));
    });
};
