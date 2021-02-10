const { Ray } = require('node-ray/web');

const RayPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$ray = (...args) => {
            return Ray.create().send(...args);
        };

        app.config.globalProperties.$rayVersion = '__BUILD_VERSION__';

        app.provide('ray', options);
    },
};

export default RayPlugin;
