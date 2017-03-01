const mongoose = require('mongoose')

let MovieSchema = new mongoose.Schema({
	title: String,
	doctor: String,
	country: String,
	language: String,
	summary: String,
	url: String,
	poster: String,
	year: Number,
	meta: {
		createAt: {
			type: Date,
			default: new Date()
		},
		updataAt: {
			type: Date,
			default: new Date()
		}
	}
})

MovieSchema.pre('save', function(next) {

	if (this.isNew) {
		this.meta.createAt = this.meta.updataAt = new Date()
	} else {
		this.meta.updataAt = new Date()
	}
	next()
})

MovieSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort({ 'meta.createAt':-1 })
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({ _id: id })
			.exec(cb)
	}
}

module.exports = MovieSchema