var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var port = require('./config').port

module.exports = {
    entry: {
        slider: './index.js',
        demo: './src/demo/demo.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'demo.html',
            template: './src/demo/index.html',
            minify: {
                removeComments: true,
                collapseInlineTagWhitespace: true
            }
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:' + port + '/dist/demo.html' })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader?importLoaders=1'
        }]
    }

}