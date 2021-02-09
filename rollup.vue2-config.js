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
            file: 'dist/index-vue2.min.cjs',
            format: 'cjs',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
        },
        {
            file: 'dist/index-vue2.min.mjs',
            format: 'esm',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
        },
    ] : [],
    unminified: [
        {
            file: 'dist/index-vue2.cjs',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: []
        },
        {
            file: 'dist/index-vue2.mjs',
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
    plugins: [commonjs(), nodeResolve()],
    external: ['axios', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
