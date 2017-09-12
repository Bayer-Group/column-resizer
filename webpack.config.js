const webpack = require('webpack');
const path = require('path');

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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            beatify: false,
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            dead_code: true,
            minimize: true,
            sourceMap: true,
            comments: false
        })
    ]
};
