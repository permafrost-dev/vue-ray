//import { mergeOptionsWithDefaults } from './options';
const { Ray } = require('node-ray/dist/web.cjs');

const RayVue2Plugin = {
    install: function (Vue, options) {
        Vue.prototype.$ray = (...args) => {
            //const opts = mergeOptionsWithDefaults(options);
            return Ray.create().send(...args);
        };
    },
};

export default RayVue2Plugin;
