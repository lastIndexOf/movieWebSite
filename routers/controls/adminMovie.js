var Movie = require('../../models/movie'),
	User = require('../../models/users'),
	_ = require('underscore'),
	path = require('path');

exports.GetMovies = (req, res) => {
	Movie.fetch((err, movies) => {
		if (err)
			console.log(err);
		res.render('admin/put', {
			title: 'put-test',
			movies: movies
		});
	});
};
exports.addMovie = (req, res) => {
	var id = req.params.id;
	if (id == 'new') {
		return res.render('admin/add', {
			title: 'add-test',
			movie: {}
		});
	} else {
		Movie.findById(id, (err, movie) => {
			res.render('admin/add', {
				title: 'add-test',
				movie: movie
			});
		})
	}
};

exports.PostNewmovie = (req, res) => {
	var movieObj = req.body.movie;
	var _movie;
	if (movieObj._id != '') {
		Movie.findById(movieObj._id, (err, movie) => {
			if (err)
				console.log(err);
			_movie = _.extend(movie, movieObj);
			// console.log(_movie);
			// _movie = new Movie(_movie);
			_movie.save((err, movie) => {
				if (err)
					console.log(err);

				res.redirect('/admin/put');
			});
		})
	} else {
		delete movieObj._id;
		_movie = new Movie(movieObj);
		_movie.save((err, movie) => {
			if (err)
				console.log(err);
			res.redirect('/admin/put');
		});
	}
};
exports.DelMovie = (req, res) => {
	var id = req.query.id;
	if (id)
		return Movie.remove({
			_id: id
		}, (err) => {
			if (err) {
				console.log(err);
				res.json({
					statu: 0,
					msg: err
				});
			} else {
				res.json({
					status: 1
				});
			}
		});
	res.json({
			status: 2,
			msg: '该记录不存在'
		})
		// res.sendFile(path.join(__dirname, '../app.js'));
};