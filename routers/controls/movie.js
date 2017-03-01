const Movie = require('../../models/movie')
		, User = require('../../models/users')
		, MovieComment = require('../../models/comment.js')
		, _ = require('underscore')
		path = require('path')

//电影页
exports.Getmovies = (req, res) => {
	Movie.fetch((err, movies) => {
		if (err)
			console.log(err)
		res.render('movies', {
			title: 'test',
			movies: movies
		})
	})
}  

exports.Getmovie = (req, res) => {
	var id = req.params.id
	Movie.findById(id, (err, movie) => {
		MovieComment
			.find({movie: id})
			.populate('from', 'nickname')
			.populate('reply.from reply.to', 'nickname')
			.exec((err, comments) => {
				if (err)
					console.log(err)

				res.render('movie', {
					title: 'movie-test',
					movie: movie,
					comments: comments
			})
		})
	})
}

