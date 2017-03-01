const express = require('express')
		, path = require('path')
		, bodyParser = require('body-parser')
		, app = express()
		, logger = require('morgan')
		, cookieParser = require('cookie-parser')
		, session = require('express-session')
		, mongoose = require('mongoose')
		, cookieSession = require('cookie-session')
		, port = process.env.PORT || 8888
		, sqlUrl = 'mongodb://localhost:27017/WebSite'

mongoose.connect(sqlUrl)
app.use(express.static('./app'))
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(cookieSession({
	name: 'session',
	keys: ['dmf', 'zfk']
}))
app.set('views', './app/views')
app.set('view engine', 'pug')
app.locals.moment = require('moment')

if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.locals.pretty = true
	app.use(logger(':method :url :status'))
	mongoose.set('debug', true)
}

require('./routers/router')(app)
require('./routers/api')(app)

app.listen(port, () => {
	console.log('listen to ' + port)
})