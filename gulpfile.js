var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var webpack = require('webpack-stream');

gulp.task('default', ['sass', 'webpack']);

gulp.task("webpack", function () {
  return gulp.src('./src/app/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('www/'));
});

gulp.task('sass', function(done) {
  gulp.src('./src/scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www'))
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(['./src/scss/**/*'], ['sass']);
  gulp.watch(['./src/app/**/*'], ['webpack']);
});
