const path = require("path");
const plugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
require("babel-polyfill");

module.exports = {
    entry: ["babel-polyfill", "./src/index.ts"],
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_dev.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    plugins: [
        new plugin({
            template: "./src/index.html",
            inject: 'head',
        }),
        new FaviconsWebpackPlugin("src/components/img/logo.png")
    ],
    devServer: {
        overlay: true,
        open: true
    }
};