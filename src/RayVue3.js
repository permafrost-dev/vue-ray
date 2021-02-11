const { Ray } = require('node-ray/web');

// send Vue error messages to Ray
const errorInterceptor = (err, vm) => {
    vm.$ray(err).red();
};

const RayPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$ray = (...args) => {
            return Ray.create().send(...args);
        };

        if (options.interceptErrors === true) {
            app.config.errorHandler = errorInterceptor;
        }

        app.config.globalProperties.$rayVersion = '__BUILD_VERSION__';

        app.provide('ray', options);
    },
};

export default RayPlugin;
