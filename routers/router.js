const Index = require('./controls/index')
		, Movie = require('./controls/movie')
		, User = require('./controls/user')
		, AdminMovies = require('./controls/adminMovie')
		, AdminUsers = require('./controls/adminUser')
		, MovieCommment = require('./controls/MovieComment')
		, Api = require('./controls/api')
		, Path = require('path')


module.exports = function(app) {
	app.use((req, res, next) => {
		if (req.session.user)
			app.locals.user = req.session.user
		else
			app.locals.user = {}

		next()
	}) 
	app.get('/css3', (req, res) => res.sendFile(Path.join(__dirname, '/../app/views/CSS3.html')
)) 
	app.get('/Blog', Index.getBlog)
	app.get('/signin', Index.Getsignin)
	app.get('/', Index.Getindex)
	app.get('/sell', Index.Getsell)
	app.get('/signout',Index.isLoged, Index.Getsignout)
	app.get('/movies', Movie.Getmovies)
	app.get('/movie/:id', Movie.Getmovie)
	app.post('/comment/movie',Index.isLoged, MovieCommment.Postmoviecomment)
	app.get('/signup', Index.Getsignup)
	app.post('/signin', Index.Postsignin)
	app.post('/signup', Index.Postsignup)
	app.get('/admin/users',Index.isLoged, Index.isAdmin, AdminUsers.GetUsers)
	app.get('/admin/put',Index.isLoged, Index.isAdmin, AdminMovies.GetMovies)
	app.get('/admin/add/:id',Index.isLoged, Index.isAdmin, AdminMovies.addMovie)
	app.post('/admin/movie/new', Index.isAdmin, AdminMovies.PostNewmovie)
	app.delete('/admin/remove', Index.isAdmin, AdminMovies.DelMovie)
}