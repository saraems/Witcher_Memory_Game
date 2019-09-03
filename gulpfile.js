const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps'); // ze strony https://www.npmjs.com/package/gulp-sourcemaps // pokazuje w przegladarce w jakim pliku jest zadeklarowany styl, plik + linijka
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const c = require('ansi-colors');

sass.compiler = require('node-sass');


function showError(err) {

    console.log(c.red(err.messageFormatted))

    notifier.notify({
        'title': 'BLAD SASS!',
        'message': err.messageFormatted
    });
}


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});




gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')   // pobierz pliki z dysku, src. Gwiazdki **/* - w tym katalogu i wszystkich podkatalogach BLAD! zmeniamy na main.scss
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "extended"}).on('error', showError)) // przeprowadz dialania na pilkach, operacje
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write(".")) // zapisywanie zrodla kodu w przegladarce, DevTool Chrome
        .pipe(gulp.dest('./css')) // zapis, plikow kompilacja do CSS
        .pipe(browserSync.stream())
});

// outputStyle : "compressed" //compact, compressed, expanded




gulp.task("watch", function () {
    gulp.watch('./scss/**/*.scss', ['sass'])
    gulp.watch("app/scss/*.scss", ['sass'])
    gulp.watch("*.html").on('change', browserSync.reload);
})



gulp.task('default', function () {
    console.log("------------------------------")
    gulp.start(['sass', 'watch', 'browser-sync']);
});