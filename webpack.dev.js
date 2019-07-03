const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: "src/index.html"
        })
    ]
});