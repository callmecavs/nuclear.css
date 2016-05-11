const cssnano  = require('cssnano')
const del      = require('del')
const gulp     = require('gulp')
const plumber  = require('gulp-plumber')
const postcss  = require('gulp-postcss')
const rename   = require('gulp-rename')
const sass     = require('gulp-sass')
const notifier = require('node-notifier')

// error handler

const onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  })

  console.log(error)
  this.emit('end')
}

// clean

gulp.task('clean', () => del('dist'))

// sass

const processors = [
  cssnano({ safe: true })
]

gulp.task('sass', () => {
  return gulp.src('src/nuclear.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('dist'))
    .pipe(postcss(processors))
    .pipe(rename('nuclear.min.css'))
    .pipe(gulp.dest('dist'))
})

// watch

gulp.task('watch', () => {
  gulp.watch('src/nuclear.scss', ['sass'])
})

// build and default tasks

gulp.task('build', ['clean'], () => {
  gulp.start('sass')
})

gulp.task('default', ['build', 'watch'])
