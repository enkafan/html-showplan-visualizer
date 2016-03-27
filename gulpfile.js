// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sassLint = require('gulp-sass-lint');
var xslt = require('gulp-xslt');

// Lint Task
gulp.task('lint', function() {
    var js = gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    var sass = gulp.src('stylesheets/*.scss')
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError());

    return merge(js, sass);
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('stylesheets/*.scss')
        .pipe(sass({includePaths: ['stylesheets']}))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('showplan.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('showplan.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// builds latest css files then makes an html
// for each xml or sqlplan file in the test_plans
// folder. it uses showplan-page.xslt which uses a
// relative path so nested folders aren't allowed here
gulp.task('xsl', ['sass', 'scripts'], function() {
    var light = gulp.src('test_plans/*.+(xml|sqlplan)')
        .pipe(xslt('showplan-page.xslt'))
        .pipe(rename(function (path) {
          path.basename += "-light";
          path.extname = ".html";
        }))
        .pipe(gulp.dest('./output/light/'));
    var dark = gulp.src('test_plans/*.+(xml|sqlplan)')
        .pipe(xslt('showplan-page-dark.xslt'))
        .pipe(rename(function (path) {
          path.basename += "-dark";
          path.extname = ".html";
        }))
        .pipe(gulp.dest('./output/dark/'));
    var nofont = gulp.src('test_plans/*.+(xml|sqlplan)')
        .pipe(xslt('showplan-page-no-font.xslt'))
        .pipe(rename(function (path) {
            path.basename += "-no-font";
            path.extname = ".html";
        }))
        .pipe(gulp.dest('./output/no-font/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('stylesheets/*.scss', ['sass']);
    gulp.watch('test_plans/*.+(xml|sqlplan', ['xsl']);
    gulp.watch('*.xslt', ['xsl']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
