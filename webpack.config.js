const path = require('path')
const GenerateJsonFile = require('generate-json-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { description, version, author } = require('./package.json')

const env = {
  prod: process.env.NODE_ENV === 'prod',
  dev: process.env.NODE_ENV === 'dev'
}

module.exports = () => {
  return {
    mode: env.prod ? 'production' : 'development',
    watch: env.dev,
    context: path.join(__dirname, 'src'),
    target: 'web',
    entry: {
      main: './main.js',
      background: './background.js',
      content: './content.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'METALMONKEY',
        chunks: ['main'],
        filename: 'main.html'
      }),
      new GenerateJsonFile({
        jsonFile: './src/manifest.json',
        filename: 'manifest.json',
        value: { description, version, author }
      })
    ],
    devtool: 'inline-cheap-source-map',
    performance: { hints: false }
  }
}
