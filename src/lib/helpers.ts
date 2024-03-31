import { PackageInfo } from '@/lib/PackageInfo';

export const createPackageMetaProperty = (obj: any) => {
    obj.$rayMeta = PackageInfo;
};

export const encodeHtmlEntities = (str: string) => {
    const escapeChars: Record<string, string> = {
        '¢': 'cent',
        '£': 'pound',
        '¥': 'yen',
        '€': 'euro',
        '©': 'copy',
        '®': 'reg',
        '<': 'lt',
        '>': 'gt',
        '"': 'quot',
        '&': 'amp',
        "'": '#39',
    };

    const chars: string[] = Object.keys(escapeChars);
    const regex = new RegExp(`[${chars.join('')}]`, 'g');

    return str.replace(regex, m => `&${escapeChars[m]};`);
};

export const matchPattern = (str: string, patterns: string[]): boolean => {
    for (let pattern of patterns) {
        pattern = pattern.replace(/\*/g, '.*');

        const re = new RegExp(pattern, 'g');

        if (re.exec(str)) {
            return true;
        }
    }

    return false;
};

export const filterObjectByKeys = (obj: any, includeKeyPatterns: string[]) => {
    const result: any = {};

    Object.keys(obj).forEach(key => {
        if (matchPattern(key, includeKeyPatterns)) {
            result[key] = obj[key];
        }
    });

    return result;
};

export const determineComponentNameDuringEvent = (options: Record<string, unknown>): string => {
    const result: string = <string>options?.name ?? 'unknown';
    let filename: string = <string>options?.__file ?? 'src/unknown.js';

    if (result.length && result !== 'unknown') {
        return result;
    }

    filename = filename.split('/').pop() ?? 'unknown.js';

    return filename.replace(/\.[\w-_]+$/, '');
};
