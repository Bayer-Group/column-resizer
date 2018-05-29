const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: "./src/ColumnResizer.js",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                  path.resolve(__dirname, "node_modules")
                ],
                use: [{loader: "babel-loader"}]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".css"]
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "column-resizer.js",
        libraryTarget: "umd",
        library: "ColumnResizer"
    },
    optimization: {
        nodeEnv: 'production',
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma: 6,
                    compress: {
                        warnings: false
                    },
                    mangle: {
                        keep_fnames: true                    },
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
