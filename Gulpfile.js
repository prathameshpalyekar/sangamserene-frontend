var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackDevServer = require('webpack-dev-server');
var path = require("path");

var webpackConfig = require('./webpack.config.js');

const WEBPACK_SERVER_PORT = 6001;

gulp.task('webpack-dev-server', function() {

    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "inline-source-map";

    // myConfig.plugins.concat(
    //     new webpack.HotModuleReplacementPlugin({})
    // );

    // myConfig.module.loaders.unshift({
    //     test: /.jsx?$/,
    //     loaders: ['react-hot'],
    //     include: path.join(__dirname, 'src'),
    //     exclude: /node_modules/
    // });

    myConfig.entry = [
        'webpack-dev-server/client?http://localhost:' + WEBPACK_SERVER_PORT,
    ].concat(myConfig.entry);

    new webpackDevServer(webpack(myConfig), {
        publicPath: myConfig.output.publicPath,
        historyApiFallback: true,
        stats: {
            colors: true
        },
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000/'
            },
        },
    }).listen(WEBPACK_SERVER_PORT, "0.0.0.0", function(err) {
        if(err) {
            throw new gulp.PluginError("webpack-dev-server", err);
        }
        gulpUtil.log("[webpack-dev-server]", "http://localhost:" + WEBPACK_SERVER_PORT + "/webpack-dev-server/index.html");
    });
});

gulp.task("webpack:build", function(callback) {
    console.log('In webpack build #####')
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) {
            throw new gulp.PluginError("webpack:build", err);
        }

        gulpUtil.log("[webpack:build]", stats.toString({
            colors: true
        }));

        gulp.src('index.html')
            .pipe(gulp.dest('./../backend/public'));
        gulp.src('favicon.png')
            .pipe(gulp.dest('./../backend/public'));
        gulp.src('assets/**/*')
            .pipe(gulp.dest('./../backend/public/assets'));
        callback();
    });
});


gulp.task("build", ["webpack:build"]);
gulp.task('default', ['webpack-dev-server']);
