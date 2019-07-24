const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/App.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      services: path.resolve(__dirname, 'src', 'services'),
      components: path.resolve(__dirname, 'src', 'components'),
      helpers: path.resolve(__dirname, 'src', 'helpers')
    },
    extensions: ['*', '.js', '.jsx', '.ttf']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  devtool: 'inline-source-map'
}