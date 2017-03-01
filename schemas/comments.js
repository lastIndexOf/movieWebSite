const mongoose = require('mongoose')
		, Schema = mongoose.Schema
		, objectId = Schema.Types.ObjectId

let CommentSchema = new Schema({
	movie: {
		type: objectId,
		ref: 'Movie'
	},
	from: {
		type: objectId,
		ref: 'User'
	},
	to: {
		type: objectId,
		ref: 'User'
	},
	reply: [{
		from: { type: objectId, ref:'User' },
		to: { type: objectId, ref:'User' },
		content: String,
		meta: {
			createAt: Date,
			updateAt: Date
		}
	}],
	content: String,
	meta: {
		createAt: {
			type: Date,
			default: new Date()
		},
		updateAt: {
			type: Date,
			default: new Date()
		}
	}
})

CommentSchema.pre('save', function(next) {
	if (this.isNew)
		this.meta.updateAt = this.meta.createAt = new Date()
	else
		this.meta.updateAt = new Date()

	next()
})

CommentSchema.statics = {
	fetch: function(cb) {
		return this.find({})
			 			.exec(cb)
	},
	findById: function(id, cb) {
		return this.findOne({ _id: id })
						.exec(cb)
	}
}

module.exports = CommentSchema