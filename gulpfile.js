const gulp = require('gulp');
const connect = require('gulp-connect');
const browserify = require('browserify');
const del = require('del');
const source = require('vinyl-source-stream');

const path = {
    src: {
        js: './src/app.js'
    },
    build: {
        js: './build/'
    }
}

gulp.task('del', () => {
    del(['build']);
});

gulp.task('webserver', () => {
    connect.server({livereload: true, root: './', port: 4000});
});

gulp.task('js', () => {
    browserify(path.src.js)
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch([path.src.js], ['js']);
});

gulp.task('default', ['js', 'webserver']);