var gulp = require('gulp');
var duo = require('gulp-duojs');

gulp.task('compile', function () {
  gulp.src('lib/bridge.js')
    .pipe(duo({standalone: 'AndroidBridge'}))
    .pipe(gulp.dest('./dest'));
});

