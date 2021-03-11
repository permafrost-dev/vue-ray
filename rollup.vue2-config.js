import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const options = {
    sourceMapsEnabled: false,
    minified: false,
    version: 2,
};

export default {
    input: `src/RayVue${options.version}.ts`,
    output: [
        {
            file: `dist/vue${options.version}.cjs.js`,
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'named',
            plugins: [],
        },
        {
            file: `dist/vue${options.version}.mjs`,
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: [],
        },
    ],
    moduleContext: { 'src/v2/Vue2RayMixin.ts': 'this' },
    plugins: [
        replace({
            values: {
                __BUILD_DATE__: () => new Date().toISOString(),
                __BUILD_VERSION__: () => require('./package.json').version,
            },
            preventAssignment: true,
        }),
        nodeResolve(),
        commonjs(),
        typescript(),
    ],
    external: [
        'axios',
        'dayjs',
        'stopwatch-node',
        'md5',
        'multimatch',
        '@permafrost-dev/pretty-format',
        'stacktrace-js',
        'xml-formatter',
        'uuid',
    ],
};
