/*
 * user model
 */

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, default: ''},
  hash_password: {type: String, default: ''}
});

UserSchema
  .virtual('password')
  .set(function (password) {
    var salt = bcrypt.genSaltSync(10);
    this.hash_password = bcrypt.hashSync(password, salt);
  })
  .get(function () { return this.hash_password; });

UserSchema.methods = {
  auth: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  }
}

mongoose.model('User', UserSchema);
