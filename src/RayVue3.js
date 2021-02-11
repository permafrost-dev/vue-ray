import { DataTrackingMixin } from './shared/DataTrackingMixin';
import { createPackageMetaProperty } from './shared/helpers';
import initializeOptions from './shared/InitializeOptions';
import { Vue3RayMixin } from './v3/Vue3RayMixin';

export default {
    install: (app, options) => {
        createPackageMetaProperty(app.config.globalProperties);

        initializeOptions(options, app.config);

        app.provide('ray', options);

        app.mixin(DataTrackingMixin);
        app.mixin(Vue3RayMixin);
    },
};
