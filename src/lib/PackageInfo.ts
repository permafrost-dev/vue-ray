/* eslint-disable no-undef */
// @ts-nocheck

export const PackageInfo = {
    NAME: typeof __LIBRARY_NAME__ !== 'undefined' ? __LIBRARY_NAME__ : 'vue-ray',
    VERSION: typeof __BUILD_VERSION__ !== 'undefined' ? __BUILD_VERSION__ : '0.0.0',
};

export default PackageInfo;
