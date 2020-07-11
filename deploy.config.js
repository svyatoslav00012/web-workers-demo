const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'),
    jsPath = './src',
    distPath = './deploy/assets/ui/javascripts/',
    srcPath = path.join(__dirname, jsPath),
    outputPath = path.join(__dirname, distPath);

module.exports = {
    optimization: {
        minimize: false
    },
    output: {
        path: outputPath,
        filename: 'bundle.js',
        publicPath: '/'
    },
    entry: {
        test: [path.join(srcPath, '/index.js')],
    },
    context: srcPath,
    plugins: [new HtmlWebpackPlugin({
        template: "index.html",
        filename: "index.html"
    })],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
        ]
    }
};
