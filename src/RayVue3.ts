import { DataTrackingMixin } from './shared/DataTrackingMixin';
import { createPackageMetaProperty } from './shared/helpers';
import initializeOptions from './shared/InitializeOptions';
import { Vue3RayMixin } from './v3/Vue3RayMixin';
import { VuexPlugin } from './vuex/VuexPlugin';

export const RayVuexPlugin = VuexPlugin;

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
