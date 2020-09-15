"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_sources_1 = require("webpack-sources");
const format = (date = new Date()) => {
    const pading = (unit) => {
        // @ts-ignore
        let unitDate = date[`get${unit}`]();
        return ('' + (unit === 'Month' ? unitDate + 1 : unitDate)).padStart(2, '0');
    };
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
    constructor(options = {}, inserted = false) {
        this.options = options;
        this.inserted = inserted;
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
                        if (!this.inserted) {
                            compilation.assets[file] = new webpack_sources_1.ConcatSource(compilation.assets[file], '\n', `!function(){console.log('version: ${version ? version : format()}')}()`);
                            this.inserted = true;
                        }
                    }
                }
            });
        });
    }
}
exports.default = VersionLogWebpackPlugin;
module.exports = VersionLogWebpackPlugin;
