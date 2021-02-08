import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import versionInjector from 'rollup-plugin-version-injector';

const options = {
    sourceMapsEnabled: !true,
    minified: false,
};

const outputs = {
    minified: options.minified ? [
        {
            file: 'dist/index.min.cjs',
            format: 'cjs',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
        },
        {
            file: 'dist/index.min.mjs',
            format: 'esm',
            plugins: [terser()],
            sourcemap: options.sourceMapsEnabled,
        },
    ] : [],
    unminified: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: []
        },
        {
            file: 'dist/index.mjs',
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: []
        },
    ],
    empty: [],
};

export default {
    input: 'src/RayVue3.ts',
    output: [
        ...outputs.unminified,
        ...outputs.minified,
    ],
    plugins: [commonjs(), nodeResolve(), typescript()],
    external: [],
};
