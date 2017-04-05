'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const tslint = require('gulp-tslint');

gulp.task('build', ['clean', 'lint'], () => {
    let tsProject = ts.createProject('./tsconfig.json');

    return gulp.src('src/**/*.ts', {base: 'src'})
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('../maps', {sourceRoot: __dirname + '/src'}))
        .pipe(gulp.dest('output'));
});

gulp.task('lint', () => {
    //noinspection JSCheckFunctionSignatures
    return gulp.src('src/**/*.ts', {base: 'src'})
        .pipe(tslint({formatter: "verbose"}))
        .pipe(tslint.report({summarizeFailureOutput: true}));
});

gulp.task('default', ['build'], () => {
});

gulp.task('watch', ['build'], () => {
    gulp.watch(['src/**/*.ts', '@types/**/*.d.ts'], (obj) => {
        console.log(obj.type.toUpperCase(), obj.path.substring(__dirname.length));

        if (obj.type === 'deleted') return;

        let tsProject = ts.createProject('./tsconfig.json');

        //noinspection JSCheckFunctionSignatures
        gulp.src(obj.path, {base: './src'})
            .pipe(tslint({formatter: "verbose"}))
            .pipe(tslint.report({summarizeFailureOutput: true}))
            .on('error', err => {}) // do not exit on lint error
            .pipe(sourcemaps.init())
            .pipe(tsProject()).js
            .pipe(sourcemaps.write('../maps', {sourceRoot: __dirname + '/src'}))
            .pipe(gulp.dest('output'));
    });
});

gulp.task('clean', () => {
    return gulp.src(['output', 'maps'], {read: false}).pipe(clean());
});