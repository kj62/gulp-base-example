let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let babelMinify = require('gulp-babel-minify');
let del = require('del');
let minifyCSS = require('gulp-clean-css');
let minifyImg = require('gulp-imagemin');
let changed = require('gulp-changed');
let runSequence = require('run-sequence');

let onError = function(err) {
    console.log(err);
}


// -- GULP TASKS --

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync({
        server: './src',
        port: '9000'
    });
});

gulp.task('scripts', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(babelMinify())
        .on('error', onError)
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('minifyCSS', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(minifyCSS())
        .on('error', onError)
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minifyImg', () => {
    return gulp.src('src/assets/**/*.{jpg,jpeg,png,gif}')
        .pipe(changed('./dist/assets'))
        .pipe(minifyImg())
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('cleanCSS', () => {
    return del('./dist/css/**');
});

gulp.task('cleanJS', () => {
    return del('./dist/js/**');
});

gulp.task('watch', () => {
    gulp.watch('src/*.html', browserSync.reload)
        .on('error', onError);
    gulp.watch('src/scss/**/*.scss')
        .on('error', onError)
        .on('change', browserSync.reload);
});


// Main run task

gulp.task('default', () => {
    runSequence('cleanCSS', 'cleanJS', 'sass', 'minifyImg', ['minifyCSS', 'scripts'],
    ['serve', 'watch']);
});