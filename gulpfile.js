var gulp = require('gulp'),
    spritesmith  = require('gulp.spritesmith')
    stylus = require('gulp-stylus');

gulp.task('stylus', function() {
    return gulp.src('./src/assets/styles/style.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./built/assets/styles'))
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./src/assets/images/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('./built/assets/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./src/assets/styles/')); // путь, куда сохраняем стили
});

gulp.task('watch', function() {
    gulp.watch('./src/assets/styles/**/*.styl', ['stylus']);
    gulp.watch('./src/assets/images/sprite/*.*', ['sprite']);
});

gulp.task('default', ['sprite', 'stylus', 'watch']);



