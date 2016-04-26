var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var watchify = require('watchify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var copy = require('gulp-copy');

var b = watchify(
    browserify({
        entries: 'assets/javascripts/browserify/main.js',
        extensions: ['.js'],
        debug: true
    })
    .transform(babelify, {
        presets: ['es2015', 'react']
    })
); 

gulp.task('bundle', function() {
    return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('assets/dist/javascripts'));

});

gulp.task('sass', function() {
    return gulp.src('assets/stylesheets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concatCss('style.min.css'))
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('assets/dist/stylesheets'))
});

gulp.task('copy', function() {
   gulp.src('assets/fonts/**/*.{ttf,woff,woff2,otf,eot,svg}')
   .pipe(gulp.dest('assets/dist/fonts'));
});

gulp.task('watch', ['sass', 'copy', 'bundle'], function() {
    gulp.watch('assets/stylesheets/sass/*.scss', ['sass']);
    gulp.watch('assets/stylesheets/sass/**/*.scss', ['sass']);
    gulp.watch(['assets/javascripts/*.js', 'assets/javascripts/browserify/**/*.js', 'assets/libs/*.js'], ['bundle']);
});










