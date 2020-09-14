# version-log-webpack-plugin

## Why use this
To confirm whether the latest version has been updated.

## Install

```bash
yarn add version-log-webpack-plugin --dev
```

## Webpack config

```js
const VersionLogPlugin = require('version-log-webpack-plugin')
// or
// const VersionLogPlugin = require('version-log-webpack-plugin').default

module.exports = {
  // ...
  plugins: [
    new VersionLogWebpackPlugin({
      version: `build-${Date.now()}` // anything what you want version info
    })
  ]
}
```
after webpack build, then look your browser console.

## LICENSE

MIT