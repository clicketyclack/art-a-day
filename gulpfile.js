/*
 * Art-a-day - Generate a art prompt based on the current date.
 * Copyright (C) 2018 Erik Mossberg
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var sass = require('gulp-sass');


gulp.task('copy_static', function () {
  gulp.src('./src/static/*')
      .pipe(gulp.dest('./dist/'));
});


gulp.task('scss2css', function() {
  gulp.src('./src/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});


gulp.task('ts2js', function() {
  var tsResult = gulp.src('./src/**/*.ts')
      .pipe(ts({
          declarationFiles: true,
          noResolve: true,
          noImplicitAny: true
      }));
 
  merge([
    tsResult.dts.pipe(gulp.dest('./dist/definitions')),
    tsResult.js.pipe(gulp.dest('./dist/js'))
    ]);
});


gulp.task('default', ['ts2js', 'scss2css', 'copy_static']);
