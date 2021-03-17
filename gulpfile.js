let gulp = require("gulp"),
  sass = require("gulp-sass"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  del = require("del"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer");

gulp.task("clean", async function () {
  del.sync("dist");
});

gulp.task("scss", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({
        browsers: ["last 8 versions"],
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.parallel("scss"));
});

gulp.task("build", gulp.series("clean"));

gulp.task("default", gulp.parallel("scss", "watch"));
