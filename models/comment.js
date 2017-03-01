const mongoose = require('mongoose')
		, CommentSchema = require('../schemas/comments.js')

let Comment = mongoose.model('comments', CommentSchema)

module.exports = Comment