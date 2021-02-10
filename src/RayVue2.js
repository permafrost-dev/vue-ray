/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { Ray } = require('node-ray/web');

const RayPlugin = {
    install: function (Vue, options) {
        Vue.prototype.$ray = (...args) => {
            return Ray.create().send(...args);
        };

        Vue.prototype.$rayVersion = '__BUILD_VERSION__';
    },
};

export default RayPlugin;
