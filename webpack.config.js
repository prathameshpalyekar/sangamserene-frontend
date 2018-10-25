var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var extractLess = new ExtractTextPlugin({
    filename: 'app.css',
    disable: process.env.NODE_ENV === 'development'
});

module.exports = {
    entry: [
        './app/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, "app"),
            "node_modules"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            },
            {
                test: /\.html/,
                loader: 'html'
            },
            {
                test: /\.(css|less)/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            paths: [
                                path.resolve(__dirname),
                                path.resolve(__dirname, "node_modules")
                            ]
                        }
                    }, {
                        loader: "less-loader",
                        options: {
                            paths: [
                                path.resolve(__dirname, 'app/less'),
                            ]
                        }
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf)?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(jpg|jpeg|svg)/,
                loader: 'file-loader?limit=1000&mimeType=image/jpg'
            },
            {
                test: /\.png/,
                loader: 'file-loader?limit=1000&mimeType=image/png'
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin({}),
        // new webpack.NoEmitOnErrorsPlugin(),
        extractLess,
    ]
};
