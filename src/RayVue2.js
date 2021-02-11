import errorHandler from './shared/ErrorHandler';
import PackageInfo from './shared/PackageInfo';
import rayMethodMixin from './shared/RayMethodMixin';

const RayPlugin = {
    install: function (Vue, options) {
        Vue.prototype.$rayVersion = PackageInfo.VERSION;

        if (options.interceptErrors === true) {
            Vue.config.errorHandler = errorHandler;
        }

        Vue.mixin({
            methods: rayMethodMixin,
        });
    },
};

export default RayPlugin;
