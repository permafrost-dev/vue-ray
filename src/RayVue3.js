import { mergeOptionsWithDefaults } from './options';
const { Ray } = require('node-ray');

const RayVue3Plugin = {
    install: (app, options) => {
        app.config.globalProperties.$ray = (...args) => {
            const opts = mergeOptionsWithDefaults(options);

            return new Ray(opts.host, opts.port).send(...args);
        };

        app.provide('ray', options);
    },
};

export default RayVue3Plugin;
