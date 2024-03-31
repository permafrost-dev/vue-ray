import { generateDtsBundle } from 'dts-bundle-generator';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, build as viteBuild } from 'vite';

const outputDir = process.env.BUILD_ENV !== 'production' ? 'dist-temp' : 'dist';

export const globalConfig = {
    libraryName: 'VueRay',
    outDir: resolve(dirname(fileURLToPath(import.meta.url)), `../${outputDir}`),
    basePath: resolve(dirname(fileURLToPath(import.meta.url)), '..'),
    builds: [
        {
            entry: 'src/RayVue3.ts',
            outfile: 'index.cjs',
            target: 'browser',
        },
        {
            entry: 'src/RayVue3.ts',
            outfile: 'index.js',
            target: 'browser',
        },
    ],
    /** @type Record<string, any>|null */
    pkg: null, // assigned in init()
    getDependencies() {
        return Object.keys(this.pkg.dependencies).concat([
            'node:fs',
            'node:fs/promises',
            'node:os',
            'node:path',
            'node:process',
            'node:url',
            'fs',
            'os',
            'process',
            'node-ray',
            'node-ray/web',
            '@permafrost-dev/pretty-format',
        ]);
    },
    async init() {
        this.pkg = JSON.parse(await readFile(resolve(this.basePath, 'package.json')));

        this.builds = this.builds.map(config => {
            config.entry = resolve(globalConfig.basePath, config.entry);
            config.minify = config.outfile.includes('.min.');
            config.standalone = config.outfile.includes('standalone');
            config.format = config.outfile.endsWith('.js') ? 'es' : 'cjs';
            if (config.standalone) {
                config.format = 'iife';
            }

            return config;
        });
    },
};

async function buildTypeDefinitions() {
    async function generateTypesForEntry(info) {
        const dts = generateDtsBundle([{ filePath: info.entry }])
            .pop()
            .replaceAll('export {};', '')
            .replaceAll(/\n{2,}/g, '\n')
            .replaceAll(/\t/g, '    ')
            .trim();

        const baseFn = info.outfile;

        await writeFile(outputDir + '/' + baseFn, dts, 'utf8');

        console.log(`Compiled ${outputDir}/${baseFn}`);
    }

    const entries = [{ entry: 'src/RayVue3.ts', outfile: 'index.d.ts' }];

    await Promise.all(entries.map(e => generateTypesForEntry(e)));
}

async function buildWithVite(config) {
    await viteBuild(
        defineConfig({
            define: {
                __BUILD_VERSION__: JSON.stringify(globalConfig.pkg.version),
            },
            build: {
                lib: {
                    entry: config.entry,
                    name: globalConfig.libraryName,
                    formats: [config.format],
                    fileName: () => config.outfile,
                },
                emptyOutDir: false,
                outDir: globalConfig.outDir,
                minify: config.minify || false,
                sourcemap: true,
                rollupOptions: {
                    external: globalConfig.getDependencies(),
                    preserveEntrySignatures: 'strict',
                    shimMissingExports: true,
                    treeshake: false,
                },
                target: config.target === 'browser' ? 'chrome90' : 'node18',
            },
            resolve: {
                extensions: ['.ts', '.js'],
                alias: {
                    '@': `${globalConfig.basePath}/src`,
                },
            },
        }),
    );
}

async function main() {
    await globalConfig.init();
    await Promise.all([...globalConfig.builds.map(config => buildWithVite(config)), buildTypeDefinitions()]);
    console.log('All library file builds complete.');
    console.log('All type definitions created.');
}

main();
