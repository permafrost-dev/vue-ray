/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { ray } = require('node-ray/web');

const RayPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$ray = (...args) => {
            return ray(...args);
        };

        app.provide('ray', options);
    },
};

export default RayPlugin;
