var gulp = require('gulp');
var header = require('gulp-header');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var modifyFile = require('gulp-modify-file');
var runSequence = require('run-sequence');
var fs = require('fs');

var pkg = JSON.parse(fs.readFileSync('./package.json'),'utf8');
var package_name = pkg.name.replace('@exa','');

gulp.task('js:clean', function(cb){
  return gulp.src(['./dist/**/*.js','./dist/**/*.jsm'])
    .pipe(clean({read:false}));
});

gulp.task('js:legacy',function(cb){
  return gulp.src('./src/**/*.element.js')
  .pipe(header('\/\* <%= name %> version <%= version %> \*\/\n', {name: pkg.name, version: pkg.version}))
  .pipe(babel())
  .pipe(rename(function (path) {
    path.extname = ".legacy.js";
  }))
  .pipe(gulp.dest('./dist/js/'));
});

// converts custom element files into js modules.
gulp.task('js:module', function(cb) {
  return gulp.src(['./src/**/*.element.js'])
  .pipe(header('\/\* <%= name %> version <%= version %> \*\/\n', {name: pkg.name, version: pkg.version}))
  .pipe(modifyFile((content, path, file) => {
    var end = '';
    var arr = content.split('customElements.define(');
    if(arr.length > 0){
      end = '\nexport default ' + arr[1].split(',')[1].replace(/\)/g,'').replace(/;/g,'').trim();
    }
    return `${content}${end}`
  }))
  .pipe(rename(function (path) {
    path.extname = ".jsm";
  }))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('js',['js:clean'], function(cb) {
  gulp.src('./src/**/*.js')
    .pipe(header('\/\* <%= name %> version <%= version %> \*\/\n', {name: pkg.name, version: pkg.version}))
    .pipe(gulp.dest('./dist/js'))

    .pipe(minify({ext:{min:'.min.js'}}))
    .pipe(gulp.dest('./dist/js'))

  runSequence('js:module','js:legacy',cb);
});
