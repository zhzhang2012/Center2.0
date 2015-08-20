var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
	return gulp.src('webapp/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})

gulp.task('minify', function() {
	return gulp.src('webapp/*.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('build'))
})

var spawn = require('child_process').spawn;
var node;

gulp.task('restart', function() {
	if (node) 
		node.kill();
	node = spawn('node', ['server.js'], {stdio: 'inherit'})
})

gulp.task('node', ['restart'], function() {
	var watcher = gulp.watch('./**/*.*', ['restart']);
	watcher.on('change', function(event) {
		console.log("Files changed. Restarted node server...");	
	})	
})

//gulp.task('default', ['node']);
gulp.task('default', ['lint', 'minify']);