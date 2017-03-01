var Movie = require('../../models/movie'),
	User = require('../../models/users'),
	_ = require('underscore'),
	path = require('path');

exports.GetUsers = (req, res) => {
	User.fetch((err, users) => {
		if (err)
			console.log(err);
		res.render('admin/users', {
			title: 'put-test',
			users: users
		});
	});
};