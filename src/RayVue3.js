import errorHandler from './shared/ErrorHandler';
import PackageInfo from './shared/PackageInfo';
import rayMethodMixin from './shared/RayMethodMixin';

const RayPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$rayVersion = PackageInfo.VERSION;

        if (options.interceptErrors === true) {
            app.config.errorHandler = errorHandler;
        }

        app.provide('ray', options);

        app.mixin({
            methods: rayMethodMixin,
        });
    },
};

export default RayPlugin;
