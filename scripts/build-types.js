import { generateDtsBundle } from 'dts-bundle-generator';
import { writeFileSync } from 'node:fs';

console.log('Compiling types...');

// @ts-ignore
const dts = generateDtsBundle([{ filePath: 'src/index.ts', output: { exportReferencedTypes: false } }])
    .pop()
    .replaceAll('export {};', '')
    .replaceAll(/\n{2,}/g, '\n')
    .replaceAll(/\t/g, '    ')
    .trim();

writeFileSync('dist/index.d.ts', dts);

console.log('✓ Compiled dist/index.d.ts');
