
const path = require('path')
const VersionLogWebpackPlugin = require('../dist/index')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname)
  },
  plugins: [
    new VersionLogWebpackPlugin({
      version: `build-${Date.now()}`
    })
  ]
}
