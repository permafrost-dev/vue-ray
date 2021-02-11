/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { Ray } = require('node-ray/web');

// send Vue error messages to Ray
const errorInterceptor = (err, vm) => {
    vm.$ray(err).red();
};

const RayPlugin = {
    install: function (Vue, options) {
        Vue.prototype.$ray = (...args) => {
            return Ray.create().send(...args);
        };

        if (options.interceptErrors === true) {
            Vue.config.errorHandler = errorInterceptor;
        }

        Vue.prototype.$rayVersion = '__BUILD_VERSION__';
    },
};

export default RayPlugin;
