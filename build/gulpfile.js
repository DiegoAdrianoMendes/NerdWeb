'use-strict';
const { series, src, dest, watch } = require('gulp');
const cleanCss = require('gulp-clean-css');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postCSS = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const optionsPostCSS = [
  autoprefixer({
    Browserslist: ['last 3 version'],
  }),
];

// Defined Theme
const name = 'nerdweb';
const outDir = '../assets';

function compileSass() {
  return new Promise(function (resolve, reject) {
    src(`assets/scss/${name}.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postCSS(optionsPostCSS))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(`${outDir}/css`));
    resolve();
  });
}

function minifyCSS() {
  return new Promise(function (resolve, reject) {
    let start = Date.now();
    src(`${outDir}/css/${name}.css`)
      .pipe(rename(`${name}.min.css`))
      .pipe(
        cleanCss(
          {
            compatibility: '*',
            format: {
              breaks: {
                afterAtRule: true,
                afterComment: true,
              },
            },
            level: {
              1: {
                specialComments: false,
              },
            },
            debug: true,
          },
          (output) => {
            console.log(
              `\x1b[32mMinified in ${
                Date.now() - start
              }ms. Minified by ${Math.floor(
                output.stats.efficiency * 100
              )}%\x1b[0m`
            );
          }
        )
      )

      .pipe(dest(`${outDir}/css`));
    resolve();
  });
}

function moveJS() {
  return new Promise(function (resolve, reject) {
    src(`assets/js/${name}.js`).pipe(dest(`${outDir}/js`));
    resolve();
  });
}

function minifyJS() {
  return src(`assets/js/${name}.js`)
    .pipe(
      minify({
        ext: {
          min: '.min.js',
        },
        noSource: true,
      })
    )
    .pipe(dest(`${outDir}/js`));
}

function browser() {
  browserSync.init(null, {
    proxy: 'http://127.0.0.1:5500/',
    files: [`${outDir}/**/*.*`],
    port: 7000,
    open: false,
  });
  watch(['./assets/js/**/*.js']).on('change', moveJS);
  watch(['./assets/scss/**/*.scss']).on('change', compileSass);
  watch(['../*.html']).on('change', browserSync.reload);
}

exports.default = browser;
exports.build = series(minifyJS, moveJS, compileSass, minifyCSS);
