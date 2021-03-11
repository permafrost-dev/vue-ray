import { PackageInfo } from './PackageInfo';

// @ts-ignore
export const createPackageMetaProperty = obj => {
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
