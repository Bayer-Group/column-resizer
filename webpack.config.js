const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
        new UglifyJSPlugin()
    ]
};
