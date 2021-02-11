import { PackageInfo } from './PackageInfo';

export const createPackageMetaProperty = obj => {
    obj.$rayMeta = PackageInfo;
};
