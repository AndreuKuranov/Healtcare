import sassLint from "gulp-sass-lint";

export const scssLint = () => {
  return app.gulp.src(app.path.watch.scss)
    .pipe(sassLint(
      {
        options: {
          configFile: '../../.sass-lint.yml',
        },
      }
    ))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}