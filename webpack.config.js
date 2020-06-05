const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
    entry: ['babel-polyfill', './src/client/index.tsx'],
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: './js/[name].bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.tsx?$/,
                use:[
                    {
                        loader: "awesome-typescript-loader"
                    },
                ],
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:'[path][name]__[local]'
                            },
                            localsConvention: 'camelCase'
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
        ]
    },
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.less']
    },
    devServer: {
        port: 8000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8050'
        }
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: "Nnergix crawler",
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            chunkFilename: './css/[id].css',
        })
    ],
};
