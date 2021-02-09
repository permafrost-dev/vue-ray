const { Ray } = require('node-ray/web');

const RayVue2Plugin = {
    install: function (Vue, options) {
        Vue.prototype.$ray = (...args) => {
            return Ray.create().send(...args);
        };
    },
};

export default RayVue2Plugin;
