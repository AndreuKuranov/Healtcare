import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import sassGlob from "gulp-sass-glob";

import cleanCss from "gulp-clean-css"; // Сжатие CSS файла
import webpcss from "gulp-webpcss"; // Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Групировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.if(
        app.isDev,
        app.plugins.sourcemaps.init()
      )
    )
    // .pipe(app.plugins.plumber(
    //   app.plugins.notify.onError({
    //     title: "SCSS",
    //     message: "Error: <%= error.message %>"
    //   })
    // ))
    .pipe(sassGlob())
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(
      app.plugins.if(
        app.isProd,
        groupCssMediaQueries()
      )
    )
    .pipe(
      app.plugins.if(
        app.isProd,
        webpcss(
          {
            webpClass: '.webp',
            noWebpClass: '.no-webp'
          }
        )
      )
    )
    .pipe(
      app.plugins.if(
        app.isProd,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 2 versions'],
          cascade: true
        })
      )
    )
    // Раскомментировать если нужен не сжатый файл
    // .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
      app.plugins.if(
        app.isProd,
        cleanCss()
      )
    )
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(
      app.plugins.if(
        app.isDev,
        app.plugins.sourcemaps.write()
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}