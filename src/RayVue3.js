import initializeOptions from './shared/InitializeOptions';
import PackageInfo from './shared/PackageInfo';
import rayMethodMixin from './shared/RayMethodMixin';

export default {
    install: (app, options) => {
        app.config.globalProperties.$rayVersion = PackageInfo.VERSION;

        initializeOptions(options, app.config);

        app.provide('ray', options);

        app.mixin({
            methods: rayMethodMixin,
        });
    },
};
