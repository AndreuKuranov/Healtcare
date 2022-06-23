import webpack from "webpack-stream";

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.if(
        app.isDev,
        app.plugins.sourcemaps.init()
      )
    )
    // .pipe(app.plugins.plumber(
    //   app.plugins.notify.onError({
    //     title: "JS",
    //     message: "Error: <%= error.message %>"
    //   })
    // ))
    .pipe(webpack({
      mode: app.isProd ? 'production' : 'development',
      output: {
        filename: 'app.min.js',
      },
      module: {
        rules: [
          { 
            test: /\.css$/, 
            use: 'raw-loader' 
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(
      app.plugins.if(
        app.isDev,
        app.plugins.sourcemaps.write()
      )
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}