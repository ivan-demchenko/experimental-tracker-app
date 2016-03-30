var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var webpack = require('webpack-stream');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'webpack']);

gulp.task("webpack", function () {
  return gulp.src('app/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('www/'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass', 'babel']);
});
