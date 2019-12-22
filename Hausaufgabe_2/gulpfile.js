const { src, dest, parallel } = require('gulp');
const htmlhint = require('gulp-htmlhint');
const debug = require('gulp-debug');
const uncomment = require('gulp-uncomment');

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

exports.html = html;
exports.uncomment = unComment;
exports.copyLibs = copyLibs;
exports.default = parallel(html, copyLibs, unComment);