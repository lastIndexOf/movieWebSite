const gulp = require('gulp')
	, nodemon = require('gulp-nodemon')
	, browserSync = require('browser-sync')
	, reload = browserSync.reload


gulp.task('browser', function() {
	browserSync.init({
		proxy: 'http://localhost:8888',
		port: 3500
	})
	
	gulp.watch(['app/js/*.js', 'routers/*.js']).on('change', reload)
	gulp.watch(['app/css/*.css', 'app/views/**/*.*']).on('change', reload)
})

gulp.task('default', ['browser'], function() {
	
	nodemon({
		script: 'app.js',
		env: {
			'NODE_ENV': 'development'
		},
		 ignore : [  
	        "app/**" 
	    ]
	})
})