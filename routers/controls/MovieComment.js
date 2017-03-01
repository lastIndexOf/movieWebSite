const Comment = require('../../models/comment.js')

exports.Postmoviecomment = (req, res) => {
	let _comment = req.body.comment
		, movieId = _comment.movie

	if (_comment.cid) {
		Comment.findById(_comment.cid, function(err, comment) {
			if (err)
				console.log(err)

			let reply = {
				from: _comment.from,
				to: _comment.tid,
				content: _comment.content,
				meta: {
					createAt: new Date(),
					updateAt: new Date()
				}
			}

			comment.reply.push(reply)

			comment.save((err, comment) => {
				if (err)
					console.log(err)

				res.redirect('/movie/' + movieId)
			})
		})
	} else {
		let comment = new Comment(_comment)

		comment.save((err, comment) => {
			if (err)
				console.log(err)

			res.redirect('/movie/' + movieId)
		})

	}

}