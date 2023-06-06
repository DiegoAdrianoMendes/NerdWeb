"use-strict";
const { series, src, dest, watch } = require("gulp");
const cleanCss = require("gulp-clean-css");
const minify = require("gulp-minify");
const browserSync = require("browser-sync").create();
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const postCSS = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const optionsPostCSS = [
  autoprefixer({
    Browserslist: ["last 3 version"],
  }),
];

// Defined Theme
const name = "nerdweb";
const outDir = "../assets";

function compileSass() {
  return new Promise(function (resolve, reject) {
    src(`assets/scss/${name}.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postCSS(optionsPostCSS))
      .pipe(sourcemaps.write("."))
      .pipe(dest(`${outDir}/css`));
    resolve();
  });
}

function minifyCSS() {
  return new Promise(async function (resolve, reject) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    src(`${outDir}/css/${name}.css`)
      .pipe(rename(`${name}.min.css`))
      .pipe(
        cleanCss(
          {
            compatibility: "*",
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
        )
      )

      .pipe(dest(`${outDir}/css`));
    resolve();
  });
}

function moveJS() {
  return new Promise(function (resolve, reject) {
    src(`assets/js/${name}.js`).pipe(dest(`${outDir}/js`));
    src(`./node_modules/swiper/swiper-bundle.min.js`).pipe(
      dest(`${outDir}/js`)
    );
    resolve();
  });
}

function minifyJS() {
  return src(`assets/js/${name}.js`)
    .pipe(
      minify({
        ext: {
          min: ".min.js",
        },
        noSource: true,
      })
    )
    .pipe(dest(`${outDir}/js`));
}

function browser() {
  browserSync.init(null, {
    proxy: "http://127.0.0.1:5500/",
    files: [`${outDir}/**/*.*`],
    port: 7000,
    open: false,
    plugins: ["bs-rewrite-rules"],
    rewriteRules: [
      {
        match: /nerdweb.min.js/gi,
        replace: "nerdweb.js",
      },
      {
        match: /nerdweb.min.css/gi,
        replace: "nerdweb.css",
      },
    ],
  });
  watch(["./assets/js/**/*.js"]).on(
    "change",
    series(moveJS, browserSync.reload)
  );
  watch(["./assets/scss/**/*.scss"]).on(
    "change",
    series(compileSass, browserSync.reload)
  );
  watch(["../*.html"]).on("change", browserSync.reload);
}

exports.default = browser;
exports.build = series(minifyJS, moveJS, compileSass, minifyCSS);
