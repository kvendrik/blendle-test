var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    ejsLocals = require('gulp-ejs-locals'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify');

var pkg = require('./package.json'),
    rootPaths = {
        www: 'www',
        dev: 'dev'
    },
    paths = {
        ejs: {
            src: [rootPaths.dev+'/ejs/**/*.ejs', '!'+rootPaths.dev+'/ejs/_inc/**/*.ejs'],
            all: [rootPaths.dev+'/ejs/**/*.ejs'],
            destFolder: './'
        },
        js: {
            src: [rootPaths.dev+'/js/main.js'],
            srcAll: [rootPaths.dev+'/js/**/*.js'],
            destFile: 'app.js',
            destFileMin: 'app.min.js',
            destFolder: rootPaths.www+'/js/'
        },
        sass: {
            src: [rootPaths.dev+'/sass/main.scss'],
            all: [rootPaths.dev+'/sass/**/*.scss'],
            destFile: 'main.min.css',
            destFolder: rootPaths.www+'/css/'
        }
    };
 
gulp.task('connect', function(){
    connect.server({
        livereload: true,
        host: '0.0.0.0',
        port: 9000,
        root: './'
    });
});

gulp.task('watch', function(){
    gulp.watch(paths.ejs.all, ['ejs']);
    gulp.watch(paths.js.srcAll, ['browsify']);
    gulp.watch(paths.sass.all, ['sass']);
});

gulp.task('ejs', function(){
    gulp.src(paths.ejs.src)
        .pipe(ejsLocals().on('error', gutil.log))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.ejs.destFolder))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src(paths.sass.src)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            expand: true,
            flatten: true,
            browsers: ['last 20 versions', 'ie 8', 'ie 9']
        }))
        .pipe(rename(paths.sass.destFile))
        .pipe(gulp.dest(paths.sass.destFolder))
        .pipe(connect.reload());
});

gulp.task('browsify', function() {
    gulp.src(paths.js.src)
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(rename(paths.js.destFile))
        .pipe(gulp.dest(paths.js.destFolder))
        .pipe(connect.reload());
});

gulp.task('uglify', function() {
    gulp.src(paths.js.destFolder+paths.js.destFile)
        .pipe(uglify())
        .pipe(rename(paths.js.destFileMin))
        .pipe(gulp.dest(paths.js.destFolder));
});

gulp.task('js', ['browsify', 'uglify']);

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['ejs', 'sass', 'js']);