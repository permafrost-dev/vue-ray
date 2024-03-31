// import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const resolvePath = str => resolve(new URL(import.meta.url).pathname.replace('/vite.config.js', ''), str);

export default defineConfig({
    plugins: [
        externalizeDeps({
            deps: true,
            devDeps: true,
            except: [],
            nodeBuiltins: true,
            optionalDeps: true,
            peerDeps: true,
            useFile: resolvePath('package.json'),
        }),
    ],
    build: {
        lib: {
            name: 'vue-ray',
            entry: ['src/RayVue3.ts'],
            formats: ['es', 'cjs'],
            fileName: format => {
                if (format === 'es') return `index.js`;
                return 'index.cjs';
            },
        },
        outDir: 'dist-temp',
        rollupOptions: {
            treeshake: true,
        },
    },
    server: {
        watch: {
            usePolling: true,
            ignored: ['**/node_modules/**', '**/dist/**', './coverage/**', '**/.git/**'],
        },
    },
    cacheDir: resolvePath('.cache'),
    resolve: {
        alias: {
            '@': resolvePath('./src'),
        },
    },
    define: {
        //'process.env.NODE_ENV': '"production"',
    },
    test: {
        name: 'Ray',
        globals: true,
        passWithNoTests: true,
        watch: false,
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
        },
        coverage: {
            all: true,
            include: ['src/**/*.ts'],
            reporter: [['text'], ['json', { file: 'coverage.json' }]],
        },
        include: ['tests/**/*.ts', 'tests/**/*.js'],
        reporters: ['default', process.env.CI ? 'github-actions' : 'verbose'],
    },
});
