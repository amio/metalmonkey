const path = require('path')
const GenerateJsonFile = require('generate-json-file-webpack-plugin')
const { description, version, author } = require('./package.json')

const env = {
  prod: process.env.NODE_ENV === 'prod',
  dev: process.env.NODE_ENV === 'dev'
}

module.exports = () => {
  return {
    mode: env.prod ? 'production' : 'development',
    watch: env.dev,
    target: 'web',
    entry: {
      main: './app/main.js',
      background: './app/background.js',
      content: './app/content.js'
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
      new GenerateJsonFile({
        jsonFile: './app/manifest.json',
        filename: 'manifest.json',
        value: { description, version, author }
      })
    ],
    devtool: 'inline-cheap-source-map',
    performance: { hints: false }
  }
}
