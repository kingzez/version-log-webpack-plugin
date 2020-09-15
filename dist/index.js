"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_sources_1 = require("webpack-sources");
const format = (date = new Date()) => {
    // @ts-ignore
    const pading = (unit) => ('' + date[`get${unit}`]()).padStart(2, '0');
    return [
        date.getFullYear(),
        pading('Month'),
        pading('Date'),
        pading('Hours'),
        pading('Minutes'),
        pading('Seconds'),
    ].reduce((acc, curr) => acc + curr, '');
};
const PLUGIN_NAME = 'VersionLogWebpackPlugin';
class VersionLogWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
            compilation.hooks.optimizeChunkAssets.tap(PLUGIN_NAME, (chunks) => {
                const { version } = this.options;
                for (const chunk of chunks) {
                    for (const file of chunk.files) {
                        if (!/\.m?js(\?.*)?$/i.test(file)) {
                            continue;
                        }
                        compilation.assets[file] = new webpack_sources_1.ConcatSource(compilation.assets[file], '\n', `!function(){console.log('version: ${version ? version : format()}')}()`);
                    }
                }
            });
        });
    }
}
exports.default = VersionLogWebpackPlugin;
module.exports = VersionLogWebpackPlugin;
