const path = require('path');
const {SRC, DIST, ASSETS} = require('./paths');
const ManifestPlugin = require('webpack-manifest-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            `...`, // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
            new CssMinimizerPlugin(),
        ],
    },
    entry: {
        'style': path.resolve(SRC, 'style.less'),
    },
    output: {
        path: DIST,
        filename: '[name].[contenthash].js',
        publicPath: ASSETS
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { url: false } },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    plugins: [
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
};