const path = require('path')
const webpack = require('webpack')
const ProgressBar = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
      helpers: path.resolve(__dirname, 'src', 'helpers'),
      components: path.resolve(__dirname, 'src', 'components'),
      resolvers: path.resolve(__dirname, 'src', 'resolvers'),
      scenes: path.resolve(__dirname, 'src', 'scenes'),
      services: path.resolve(__dirname, 'src', 'services'),
      store: path.resolve(__dirname, 'src', 'store'),
      utils: path.resolve(__dirname, 'src', 'utils')
    },
    extensions: ['*', '.js', '.jsx', '.ttf']
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'public'),
    publicPath: '/',
    filename: `bundle${(new Date()).getTime()}.js`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBar(),
    new HtmlWebpackPlugin({
      template: __dirname + '/dist/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  },
  devtool: 'inline-source-map'
}