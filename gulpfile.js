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
        'node_modules/@fortawesome/fontawesome-free/js/all.js',
        'node_modules/js-cookie/src/js.cookie.js',
        'assets/js/twitter.js',
        'assets/js/UnityLoader.js',
        'assets/js/UnityProgress.js',
        'assets/js/main.js',
        'node_modules/slick-carousel/slick/slick.js'
    ],
    cssFiles      = [
        'node_modules/bootstrap/dist/css/*.css',
        'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/slick-carousel/slick/slick-theme.css',
        'style.css'
    ],
    fontFiles     =[
    ],
    webfontsFiles =[
        'node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,woff2,eot,svg}',
        'node_modules/slick-carousel/slick/fonts/*.{ttf,woff,woff2,eot,svg}',
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
        .pipe(gulp.dest('assets/css/'));
    done();
});

gulp.task('js', function (done) {
    gulp.src(jsScripts, { sourcemaps: true })
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('assets/js/', { sourcemaps: true }));
    done();
});

gulp.task('watch_files', function(){
    gulp.watch('style.css', ['css']).on('change', browserSync.reload);
    gulp.watch('assets/js/main.js', ['js']).on('change', browserSync.reload);
});

gulp.task('copy_fonts', function (done) {
    gulp.src(webfontsFiles)
        .pipe(gulp.dest('assets/webfonts/'));
    // console.log(cssFiles);
    done();
});

gulp.task('hi', function(done) {
    console.log(cssFiles);
    done();
});

function css(done){
    gulp.src(cssFiles)
        .pipe(cleanCSS())
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('assets/css/'));
    done();
}

function js(done){
    gulp.src(jsScripts, { sourcemaps: true })
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('assets/js/', { sourcemaps: true }));
    browserSync.reload();
    done();
}

// exports.prod = gulp.parallel('js', 'css');
exports.default = gulp.series('js', 'css', 'browserSync', 'watch_files');

// exports.default = function() {
//     // gulp.watch('style.css', css);
//     // gulp.watch('assets/js/main.js', js);
//     // gulp.watch('*.php').on('change', browserSync.reload);
//     gulp.parallel('js', 'css', 'browserSync', 'watch_files');
// };
