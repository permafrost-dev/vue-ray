import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const options = {
    sourceMapsEnabled: true,
    minified: true,
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
    plugins: [commonjs()],
    external: ['node-ray/web'],
};
