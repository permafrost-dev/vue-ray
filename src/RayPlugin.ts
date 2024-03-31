import { DataTrackingMixin } from './shared/DataTrackingMixin';
import { createPackageMetaProperty } from './lib/helpers';
import initializeOptions from './shared/InitializeOptions';
import { Vue3RayMixin } from './RayMixin';

export const RayPlugin = {
    install: (app: any, options: any) => {
        createPackageMetaProperty(app.config.globalProperties);

        initializeOptions(options, app.config);

        app.provide('ray', options);

        app.mixin(DataTrackingMixin);
        app.mixin(Vue3RayMixin);
    },
};

export default RayPlugin;
