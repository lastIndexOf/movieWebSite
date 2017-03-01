var mongoose = require('mongoose'),
	userSchema = require('../schemas/user.js'),
	User = mongoose.model('User', userSchema);

module.exports = User;
