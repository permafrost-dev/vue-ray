import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const options = {
    sourceMapsEnabled: true,
    minified: false,
};

const outputs = {
    minified: options.minified ? [
        {
            file: 'dist/vue2.cjs.min.js',
            format: 'cjs',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
        },
        {
            file: 'dist/vue2.min.mjs',
            format: 'esm',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
        },
    ] : [],
    unminified: [
        {
            file: 'dist/vue2.cjs.js',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: []
        },
        {
            file: 'dist/vue2.mjs',
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: []
        },
    ]
};

export default {
    input: 'src/RayVue2.js',
    output: [
        ...outputs.unminified,
        ...outputs.minified,
    ],
    plugins: [
        replace({
            __buildDate__: () => (new Date()).toISOString(),
            __buildVersion__: () => require('./package.json').version,
        }),
        nodeResolve(),
        commonjs(),
    ],
    external: ['axios', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
