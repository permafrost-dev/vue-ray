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
            exports: 'auto',
            plugins: [],
        },
        {
            file: `dist/vue${options.version}.mjs`,
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: [],
        },
    ],
    plugins: [
        replace({
            __BUILD_DATE__: () => new Date().toISOString(),
            __BUILD_VERSION__: () => require('./package.json').version,
        }),
        nodeResolve(),
        commonjs(), //{ extensions: ['.js', '.ts'] }),
        typescript(), //{ module: 'es2015' }),
    ],
    external: ['axios', 'dayjs', 'stopwatch-node', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
