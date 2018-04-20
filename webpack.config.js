const path = require('path')

module.exports = env => {
  return {
    mode: env.prod ? 'production' : 'development',
    watch: env.dev,
    target: 'web',
    entry: {
      main: './app/main.js',
      background: './app/background.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        }
      ]
    },
    devtool: 'inline-cheap-source-map',
    performance: { hints: false }
  }
}
