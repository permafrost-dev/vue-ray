const { ray } = require('node-ray/web');

const RayVue3Plugin = {
    install: (app, options) => {
        app.config.globalProperties.$ray = (...args) => {
            return ray(...args);
        };

        app.provide('ray', options);
    },
};

export default RayVue3Plugin;
