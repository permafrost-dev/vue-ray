import errorHandler from './ErrorHandler';
import rayMethodMixin from './RayMethodMixin';

const RayPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$rayVersion = '__BUILD_VERSION__';

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
