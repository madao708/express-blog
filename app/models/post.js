/*
 * Post model
 */

var marked = require('marked');
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type: String, default: ''},
  content: {type: String, default: ''},
  create_date: {type: Date, default: Date.now()},
  tags: {type: []}
});

PostSchema
  .virtual('createDate')
  .get(function () {return moment(this.create_date).format('lll');});

PostSchema
  .virtual('contentParsed')
  .get(function () {return marked(this.content);})

PostSchema
  .virtual('summary')
  .get(function () {return this.content.substring(0, 100);})

mongoose.model('Post', PostSchema);
