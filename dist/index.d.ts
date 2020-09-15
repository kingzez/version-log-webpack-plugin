import { Compiler } from 'webpack';
export interface VersionLogPluginOptions {
    version?: string | number;
}
export default class VersionLogWebpackPlugin {
    private readonly options;
    private inserted;
    constructor(options?: VersionLogPluginOptions, inserted?: boolean);
    apply(compiler: Compiler): void;
}
