const gulp = require('gulp');
const size = require('gulp-size');
const runSequence = require('run-sequence');

gulp.task('size:css', () =>
    gulp.src('./dist/**/*.css')
        .pipe(size({title:'css',gzip:true,showFiles:true,showTotal:false}))
        .pipe(gulp.dest('dist'))
);

gulp.task('size:js', () =>
    gulp.src('./dist/**/*.js')
        .pipe(size({title:'js',gzip:true,showFiles:true,showTotal:false}))
        .pipe(gulp.dest('dist'))
);

gulp.task('size',function(callback) {
  runSequence('size:css','size:js',callback);
});
