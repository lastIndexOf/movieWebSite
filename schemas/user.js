const mongoose = require('mongoose')
		, bcrypt = require('bcrypt')
		, SALT_SAFE = 10

let UserSchema = new mongoose.Schema({
	nickname: {
		unique: true,
		type: String
	},
	password: {
		type: String
	},
	// 0 :普通用户
	// >10:管理员
	// 50:superAdmin
	role: {
		type: Number,
		default: 0
	},
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

UserSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updataAt = new Date()
	} else {
		this.meta.updataAt = new Date()
	}
	var user = this
	bcrypt.genSalt(SALT_SAFE, function(err, salt) {
		if (err)
			return next(err)
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err)
				return next(err)
			user.password = hash
			next()
		})
	})
})

UserSchema.methods = {
	compareMatch: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err,isMatch) {
			if(err)
				return cb(err)
			cb(null,isMatch)
		})
	}
}

UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb)
	}
}

module.exports = UserSchema