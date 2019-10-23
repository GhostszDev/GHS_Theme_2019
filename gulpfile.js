'use strict';

const
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    newer         = require('gulp-newer'),
    imagemin      = require('gulp-imagemin'),
    sass          = require('gulp-sass'),
    postcss       = require('gulp-postcss'),
    deporder      = require('gulp-deporder'),
    concat        = require('gulp-concat'),
    stripdebug    = require('gulp-strip-debug'),
    uglify        = require('gulp-uglify'),
    minify        = require('gulp-minify'),
    clean         = require('gulp-clean'),
    cleanCSS      = require('gulp-clean-css'),
    autoprefixer  = require('autoprefixer'),
    cssnano       = require('cssnano'),
    jsScripts     = [
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'assets/js/main.js'
    ],
    cssFiles      = [
        'node_modules/bootstrap/dist/css/*.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'style.css'
    ],
    files = [
        'style.css',
        'assets/js/*.js',
        'index.php',
        '.htaccess'
    ];

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init(files, {
        proxy: 'ghostszmusic.local',
        injectChanges: true,
    })
});

gulp.task('css', function (done) {
    gulp.src(cssFiles)
        .pipe(cleanCSS())
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({ stream: true }));
    done();
});

gulp.task('js', function (done) {
    gulp.src(jsScripts, { sourcemaps: true })
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('assets/js/', { sourcemaps: true }))
        .pipe(browserSync.reload({ stream: true }));
    done();
});

gulp.task('watch_files', function(){
    gulp.watch('style.css', '', 'css');
    gulp.watch('assets/js/main.js', '', 'js');
    browserSync.reload();
});


exports.default = gulp.series('js', 'css', 'browserSync', 'watch_files');