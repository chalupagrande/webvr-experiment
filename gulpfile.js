const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})
gulp.watch(['index.html','app.js']).on('change', browserSync.reload)
gulp.task('default', ['serve'])