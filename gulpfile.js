const prefixer = require('autoprefixer')
const cssnano  = require('cssnano')
const del      = require('del')
const gulp     = require('gulp')
const plumber  = require('gulp-plumber')
const postcss  = require('gulp-postcss')
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
  prefixer({ browsers: 'last 2 versions' })
  // cssnano({ safe: true })
]

gulp.task('sass', () => {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(maps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist'))
})

// watch

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', ['sass', reload])
})

// build and default tasks

gulp.task('build', ['clean'], () => {
  gulp.start('sass')
})

gulp.task('default', ['build', 'watch'])
