const { src, dest, parallel } = require('gulp');
const htmlhint = require('gulp-htmlhint');
const debug = require('gulp-debug');
// const eslint = require('gulp-eslint');
const uncomment = require('gulp-uncomment');
// var tslint = require('gulp-tslint');

// async function tsLint() {
//     return src('*.ts')
//         .pipe(tslint({
//             formatter: 'verbose'
//         }))
//         .pipe(tslint.report())
//         .pipe(dest('./dist'));
// }

async function html() {
    return src('*.html')
        .pipe(debug({ title: 'html:' }))
        .pipe(htmlhint())
        .pipe(htmlhint.failOnError())
        .pipe(dest('./dist'));
}

async function unComment() {
    return src('ts/*.js')
        .pipe(uncomment({
            removeEmptyLines: true
        }))
        .pipe(dest('./dist'));
}

async function copyLibs() {
    return src('css/*.css')
        .pipe(debug({ title: 'dep :' }))
        .pipe(dest('./dist'));
}

// async function esLint() {
//     return src(['ts/*.js'])
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// }

// exports.tslint = tsLint;
// exports.eslint = esLint;
exports.html = html;
exports.uncomment = unComment;
exports.copyLibs = copyLibs;
exports.default = parallel(html, copyLibs, unComment);
// exports.default = parallel(html, esLint, copyLibs, unComment);