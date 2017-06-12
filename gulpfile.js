//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');//本地安装gulp所用到的地方
var browserSync = require('browser-sync').create();
var less = require('gulp-less');

//定义一个lessTask任务（自定义任务名称）
gulp.task('lessTask', function () {
    gulp.src('src/less/app.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css'))
        .pipe(browsersync.stream()); //将会在src/css下生成app.css
});

gulp.task('serve', function() {
    browserSync.init({
        port: 80,
        server: {
            baseDir: ['src']
        }
    });
    gulp.watch('src/**/*.less', ['lessTask']);

    gulp.watch("./src/css/*.css").on('change', browserSync.reload);  
    gulp.watch("./src/*.html").on('change', browserSync.reload);  
    gulp.watch("./src/js/*.js").on('change', browserSync.reload);  
});

gulp.task('default',['serve']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径
