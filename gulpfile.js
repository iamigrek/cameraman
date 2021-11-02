const { src, dest, series, watch } = require('gulp');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');

const clean = () => {
  return del(['app/*']);
};

const svgSprites = () => {
  return src('./src/images/svg/**.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('./app/images'));
};

const resources = () => {
  return src('./src/resources/**').pipe(dest('./app'));
};

const styles = () => {
  return src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  src('./src/js/vendor/**.js')
    .pipe(concat('vendor.js'))
    .pipe(dest('./app/js/'))
    .pipe(browserSync.stream());
  return src(['./src/js/components/**.js'])
    .pipe(concat('main.js'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
};

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(
      fileInclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
};

const images = () => {
  return src([
    './src/images/**.jpg',
    './src/images/**.png',
    './src/images/**.jpeg',
    './src/images/*.svg',
    './src/images/**/*.jpg',
    './src/images/**/*.png',
    './src/images/**/*.jpeg',
  ]).pipe(dest('./app/images'));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app',
    },
  });

  watch('./src/styles/**/*.scss', styles);
  watch('./src/content/**/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/js/**/*.js', scripts);
  watch('./src/resources/**', resources);
  watch('./src/images/*.{jpg,jpeg,png,svg}', images);
  watch('./src/images/**/*.{jpg,jpeg,png}', images);
  watch('./src/images/svg/**.svg', svgSprites);
};

exports.default = series(
  clean,
  resources,
  styles,
  images,
  svgSprites,
  scripts,
  htmlInclude,
  watchFiles
);
