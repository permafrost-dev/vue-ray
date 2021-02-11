import errorHandler from './ErrorHandler';
import rayMethodMixin from './RayMethodMixin';

const RayPlugin = {
    install: function (Vue, options) {
        Vue.prototype.$rayVersion = '__BUILD_VERSION__';

        if (options.interceptErrors === true) {
            Vue.config.errorHandler = errorHandler;
        }

        Vue.mixin({
            methods: rayMethodMixin,
        });
    },
};

export default RayPlugin;
