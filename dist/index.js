"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_sources_1 = require("webpack-sources");
const format = (date = new Date()) => {
    const padding = (d) => ('' + d).padStart(2, '0');
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].reduce((acc, curr) => acc + padding(curr), '');
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
