var mongoose = require('mongoose');
var UserSchema = require('../schema/users.js');

var Users = mongoose.model('Users', UserSchema);

module.exports = Users;