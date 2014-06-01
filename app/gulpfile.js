var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: false});

var argv = require('minimist')(process.argv.slice(2));

var paths = {
  app: {
    scripts: {
      entry: 'js/main.js',
      all: 'js/**/*.js'
      // bower components pulled in with usemin
    },
    stylesheets: ['css/*.css', 'sass/*.sass'],
    images: 'img/**/*.{gif, png, jpg}',
    svgs: 'img/**/*.svg',
    extras: ['*.{png,ico,txt,xml}', '404.html', 'CNAME'],
    temp: 'temp',
    ext: 'ext/*'
  },
  dist: {
    // BE VERY CAREFUL CHANGING ROOT VALUE (see clean_dist task)
    root: '../dist',
    scripts: '../dist/js',
    stylesheets: '../dist/css',
    images: '../dist/img',
    ext: '../dist/ext'
  }
};

gulp.task('copy_ext', function() {
  return gulp.src(paths.app.ext)
    .pipe(gulp.dest(paths.dist.ext))
    .pipe($.size());
});

gulp.task('build_app', function() {
  return gulp.src(paths.app.scripts.entry)
    .pipe($.browserify({
      insertGlobals: false,
      debug: argv.debug
    }))
    .pipe($.rename('app.js'))
    .pipe(gulp.dest(paths.app.temp))
    .pipe($.size())
    .pipe($.connect.reload());
});

gulp.task('lint', function() {
  return gulp.src(paths.app.scripts.all)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
});

gulp.task('usemin', function() {
  gulp.src('index.html')
    .pipe($.usemin())
    .pipe(gulp.dest(paths.app.temp))
    .pipe($.size());
});

gulp.task('js_concat', ['lint', 'build_app', 'usemin'], function() {
  return gulp.src([paths.app.temp + '/js/*.js', paths.app.temp + '/*.js'])
    .pipe($.concat('all.js'))
    .pipe($.if(!argv.dev, $.uglify()))
    .pipe(gulp.dest(paths.dist.scripts))
    .pipe($.size());
});

gulp.task('sass', function () {
  return gulp.src(paths.app.stylesheets)
    .pipe($.rubySass())
    .pipe($.concat('main.css'))
    .pipe($.autoprefixer())
    .pipe($.if(!argv.dev, $.minifyCss()))
    .pipe(gulp.dest(paths.dist.stylesheets))
    .pipe($.size())
    .pipe($.connect.reload());
});

gulp.task('html', ['scripts'], function() {
  return gulp.src(paths.app.temp + '/*.html')
    .pipe($.if(!argv.dev, $.minifyHtml({empty: true})))
    .pipe(gulp.dest(paths.dist.root))
    .pipe($.size())
    .pipe($.connect.reload());
});

gulp.task('images', [], function() {
  return gulp.src(paths.app.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.images))
    .pipe($.size())
    .pipe($.connect.reload());
});

gulp.task('svgs', [], function() {
  return gulp.src(paths.app.svgs)
    .pipe($.svgmin())
    .pipe(gulp.dest(paths.dist.images))
    .pipe($.size())
    .pipe($.connect.reload());
});

gulp.task('extras', function() {
  return gulp.src(paths.app.extras)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.root))
    .pipe($.size())
    .pipe($.connect.reload());
});

gulp.task('clean_temp', ['scripts', 'html', 'images', 'svgs'], function () {
  return gulp.src(paths.app.temp, {read: false})
    .pipe($.clean());
});

gulp.task('watch_files', function() {
  gulp.watch(paths.app.scripts.all, ['scripts']);
  gulp.watch(paths.app.stylesheets, ['sass']);
  gulp.watch(paths.app.images, ['images']);
});

gulp.task('gh_pages', ['default'], function () {
  gulp.src(paths.dist.root + '/**/*')
    .pipe($.ghPages('https://github.com/Queens-Hacks/the-best-idea-webapp.git', 'origin'));
});

gulp.task('connect', ['default'], $.connect.server({
    root: [paths.dist.root],
    port: 1234,
    livereload: true,
    open: {
      browser: 'Google Chrome'
    }
}));

gulp.task('scripts', ['lint', 'build_app', 'usemin', 'js_concat']);
gulp.task('default', ['scripts', 'sass', 'html', 'extras', 'copy_ext', 'images', 'svgs', 'clean_temp']);

// These are the ones you'll want to call.
//
// Be very careful using clean_dist; since force
// is sent to true, it has the potential to delete
// anything in your filesystem. You've been warned!
gulp.task('clean_dist', function () {
  return gulp.src(paths.dist.root, {read: false})
    .pipe($.clean({force: true})); // !!!
});
gulp.task('watch', ['default', 'watch_files', 'connect']);
gulp.task('deploy', ['default', 'gh_pages']);
