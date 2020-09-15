import { Compiler, compilation } from 'webpack'
import { ConcatSource } from 'webpack-sources'

const format = (date = new Date()) => {
  const pading = (unit: string) => {
    // @ts-ignore
    let unitDate = date[`get${unit}`]()
    return ('' + (unit === 'Month' ? unitDate + 1 : unitDate)).padStart(2, '0')
  }
  return [
    date.getFullYear(),
    pading('Month'),
    pading('Date'),
    pading('Hours'),
    pading('Minutes'),
    pading('Seconds'),
  ].reduce((acc: string, curr: string) => acc + curr, '')
}

const PLUGIN_NAME = 'VersionLogWebpackPlugin'

export interface VersionLogPluginOptions {
  version?: string | number
}

export default class VersionLogWebpackPlugin {
  private readonly options: VersionLogPluginOptions
  private inserted: boolean

  constructor(options: VersionLogPluginOptions = {}, inserted = false) {
    this.options = options
    this.inserted = inserted
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      PLUGIN_NAME,
      (compilation: compilation.Compilation) => {
        compilation.hooks.optimizeChunkAssets.tap(PLUGIN_NAME, (chunks) => {
          const { version } = this.options
          for (const chunk of chunks) {
            for (const file of chunk.files) {
              if (!/\.m?js(\?.*)?$/i.test(file)) {
                continue
              }
              if (!this.inserted) {
                compilation.assets[file] = new ConcatSource(
                  compilation.assets[file],
                  '\n',
                  `!function(){console.log('version: ${
                    version ? version : format()
                  }')}()`
                )
                this.inserted = true
              }
            }
          }
        })
      }
    )
  }
}

module.exports = VersionLogWebpackPlugin
