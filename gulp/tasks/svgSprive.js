import svgSprite from "gulp-svg-sprite";

export const spriteMono = () => {
  return app.gulp.src(app.path.src.spriteMono)
    // .pipe(app.plugins.plumber(
    //   app.plugins.notify.onError({
    //     title: "SVG",
    //     message: "Error: <%= error.message %>"
    //   })
    // ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../icons/sprite-mono.svg',
          example: app.isDev
        }
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name', 'fill', 'stroke'],
                  },
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(app.gulp.dest(app.path.build.images))
}

export const spriteMulti = () => {
  return app.gulp.src(app.path.src.spriteMulti)
    // .pipe(app.plugins.plumber(
    //   app.plugins.notify.onError({
    //     title: "SVG",
    //     message: "Error: <%= error.message %>"
    //   })
    // ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../icons/sprite-multi.svg',
          example: app.isDev
        }
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name'],
                  },
                },
                {
                  removeUselessStrokeAndFill: false,
                },
                {
                  inlineStyles: true,
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(app.gulp.dest(app.path.build.images))
}