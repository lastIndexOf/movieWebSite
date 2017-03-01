var mongoose = require('mongoose'),
	MovieSchema = require('../schemas/movie'),
	Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie

