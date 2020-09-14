import { Compiler } from 'webpack';
export interface VersionLogPluginOptions {
    version?: string | number;
}
export default class VersionLogWebpackPlugin {
    private readonly options;
    constructor(options?: VersionLogPluginOptions);
    apply(compiler: Compiler): void;
}
