/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { Ray } = require('node-ray/dist/web.cjs');
//import { Ray } from 'node-ray/web';

const RayVue2Plugin = {
    install: function (Vue, options) {
        Vue.prototype.$ray = (...args) => {
            //const opts = mergeOptionsWithDefaults(options);
            return Ray.create().send(...args);
        };
    },
};

export default RayVue2Plugin;
