import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

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
    plugins: [commonjs()],
    external: ['node-ray/web']
};
