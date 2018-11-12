'use strict';
require('dotenv').config();

var s3   = require('gulp-s3')
var cloudfront = require('gulp-cloudfront-invalidate')
var gulp = require('gulp')
var runSequence = require('run-sequence')
var fs = require('fs');

var pkg = JSON.parse(fs.readFileSync('./package.json'),'utf8');
var package_name = pkg.name.replace('@exa','');

var AWS = {
  "key":    process.env.AWS_ACCESS_KEY_ID,
  "secret": process.env.AWS_SECRET_ACCESS_KEY,
  "bucket": process.env.AWS_BUCKET,
  "region": "us-east-1"
}

var S3Options = { uploadPath: package_name +'/' };

gulp.task('deploy:s3', () => {
  gulp.src('./dist/*').pipe(s3(AWS,S3Options));
});

gulp.task('deploy:invalidate',() => {
  var settings = {
    distribution: process.env.AWS_DISTRIBUTION,
    paths: [package_name+'/*'],
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    wait: false
  };
  return gulp.src('*')
    .pipe(cloudfront(settings))
});

gulp.task('deploy',function(callback) {
  runSequence('deploy:s3','deploy:invalidate',callback);
});
