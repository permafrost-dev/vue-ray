import { mergeOptionsWithDefaults } from './options';
const { Ray } = require('node-ray');

const RayVue2Plugin = {
    install: function (Vue, options) {
        Vue.prototype.$ray = (...args) => {
            const opts = mergeOptionsWithDefaults(options);

            return new Ray(opts.host, opts.port).send(...args);
        };
    },
};

export default RayVue2Plugin;
