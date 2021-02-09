import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const options = {
    sourceMapsEnabled: true,
    minified: false,
};

const outputs = {
    minified: options.minified ? [
        {
            file: 'dist/index-vue3.min.cjs',
            format: 'cjs',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
        },
        {
            file: 'dist/index-vue3.min.mjs',
            format: 'esm',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
        },
    ] : [],
    unminified: [
        {
            file: 'dist/index-vue3.cjs',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: []
        },
        {
            file: 'dist/index-vue3.mjs',
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: []
        },
    ]
};

export default {
    input: 'src/RayVue3.js',
    output: [
        ...outputs.unminified,
        ...outputs.minified,
    ],
    plugins: [nodeResolve(), commonjs(),],
    external: ['axios', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
