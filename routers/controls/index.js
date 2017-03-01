var Movie = require('../../models/movie'),
	User = require('../../models/users'),
	_ = require('underscore'),
	path = require('path')

//权限控制
exports.isAdmin = (req, res, next) => {
	if (!req.session.user)
		return res.redirect('/signin')

	User.findById(req.session.user._id, (err, user) => {
		if (err)
			console.log(err)
		if (user.role > 10)
			return next()
		res.redirect('/')
	})
}

//登陆控制

exports.isLoged = (req, res, next) => {
	if (!req.session.user)
		res.redirect('/')
	
	return next()
}
//首页
exports.Getindex = (req, res) => {
	if (!req.session.user) {
		return res.redirect('/signin')
	}
	res.render('index', {
		title: 'welcome'
	})
}
// 饿了么外卖页面
exports.Getsell = (req, res) => {
	res.sendFile(path.join(__dirname, '../../app/views/dist/index.html'))
}
//登陆注册
exports.Getsignout = (req, res) => {
	delete req.session.user
	res.redirect('/')
}

exports.Getsignin = (req, res) => {
	var _msg = req.query.msg
	if (_msg) {
		switch (_msg) {
			case '1':
				{
					console.log('1')
					res.render('signin', {
						msg: {
							status: 1,
							message: '用户不存在'
						}
					})
				}
				break
			case '2':
				{
					console.log('2')
					res.render('signin', {
						msg: {
							status: 2,
							message: '密码错误,请重新输入'
						}
					})
				}
				break
		}
	} else{
		res.render('signin')
	} 
}

exports.Getsignup = (req, res) => {
	var _msg = req.query.msg
	if (_msg) {
		return res.render('signup', {
			msg: '用户名已存在'
		})
	}

	res.render('signup')
}

exports.Postsignin = (req, res) => {
	var _user = req.body.user
	// console.log(_user)
	User.findOne({
		nickname: _user.nickname
	}, (err, user) => {
		if (err)
			console.log(err)
		if (!user)
			return res.redirect('/signin?msg=1')

		user.compareMatch(_user.password, (err, isMatch) => {
			if (err)
				console.log(err)
			if (isMatch) {
				req.session.user = user
				if (user.role >= 10)
					return res.redirect('/admin/put')
				return res.redirect('/')
			}

			return res.redirect('/signin?msg=2')
		})
	})
}

exports.Postsignup = (req, res) => {
	var user = req.body.user
	var _user = new User(user)

	User.find({
		nickname: _user.nickname
	}, (err, users) => {
		if (err)
			console.log(err)
		if (users.length) {
			res.redirect('/signup?msg=1')
		} else {
			_user.save((err, user) => {
				if (err)
					console.log(err)
				req.session.user = user
				res.redirect('/')
			})
		}
	})

}

exports.getBlog = (req, res) => {
	res.render('Blog')
}