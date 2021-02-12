import { PackageInfo } from './PackageInfo';

// @ts-ignore
export const createPackageMetaProperty = obj => {
    obj.$rayMeta = PackageInfo;
};
