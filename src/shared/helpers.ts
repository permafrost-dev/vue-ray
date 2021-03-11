import { PackageInfo } from './PackageInfo';
import multimatch from 'multimatch';

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

export const filterObjectByKeys = (obj: any, includeKeyPatterns: string[]) => {
    const result: any = {};

    Object.keys(obj).forEach(key => {
        multimatch(key, includeKeyPatterns).forEach(match => {
            result[match] = obj[match];
        });
    });

    return result;
};
