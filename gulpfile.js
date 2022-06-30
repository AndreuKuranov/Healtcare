import gulp from "gulp";

import { clean } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"; // otfToTtf
import { spriteMono, spriteMulti } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { scssLint } from "./gulp/tasks/scssLint.js";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js"

global.app = {
  isProd: process.argv.includes('--production'),
  isDev: !process.argv.includes('--production'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

function watcher() {
  gulp.watch(path.watch.html, html); //gulp.series(html, ftp) для всех задач
  gulp.watch(path.watch.scss, gulp.parallel(scssLint, scss));
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(ttfToWoff, fontsStyle); // otfToTtf
const sprite = gulp.parallel(spriteMono, spriteMulti);

const build = gulp.series(clean, gulp.parallel(html, js, fonts, sprite, images), gulp.parallel(scssLint, scss));
const dev = gulp.series(build, gulp.parallel(watcher, server));

const deployZIP = gulp.series(build, zip);
const deployFTP = gulp.series(build, ftp);

export { sprite, dev, build, deployZIP, deployFTP }
