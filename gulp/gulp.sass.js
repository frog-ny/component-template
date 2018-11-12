var gulp = require('gulp');

var fs = require('fs');
var header = require('gulp-header');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var lint = require('gulp-stylelint');
var clean = require('gulp-clean');
var minify = require('gulp-clean-css');

var pkg = JSON.parse(fs.readFileSync('./package.json'),'utf8');
var package_name = pkg.name.replace('@exa','');

gulp.task('sass:clean', function(cb){
  return gulp.src('./dist/**/*.css')
    .pipe(clean({read:false}));
});

gulp.task('sass:lint', function(cb){
  var task = gulp.src('./src/**/*.scss')
  .pipe(lint({
    reporters: [
      {formatter: 'string', console: true}
    ]
  }))
  return task;
});

gulp.task('sass', ['sass:clean','sass:lint'], function(cb) {
  var task = gulp.src('./src/output.scss')
    .pipe(sass().on('error', sass.logError))

    // add a header
    .pipe(header('\/\* <%= name %> version <%= version %> \*\/\n', {name: pkg.name, version: pkg.version}))

    // name it, save it
    .pipe(rename(package_name+'.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(minify())
    .pipe(rename(package_name+'.min.css'))
    .pipe(gulp.dest('./dist/css'))

    /*
    .pipe(rename(package_name+'.'+pkg.version+'.css'))
    .pipe(gulp.dest('./dist/css'))
    */




    /*

    .pipe(rename(package_name+'.'+pkg.version+'.min.css'))
    .pipe(gulp.dest('./dist/css'))
    */

  return task;

});
