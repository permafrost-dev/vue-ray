import { DataTrackingMixin } from '@/DataTrackingMixin';
import { initializeOptions } from '@/InitializeOptions';
import { createPackageMetaProperty } from '@/lib/helpers';
import { RayMixin } from '@/RayMixin';

export const RayPlugin = {
    install: (app: any, options: any) => {
        createPackageMetaProperty(app.config.globalProperties);

        initializeOptions(options, app.config);

        app.provide('ray', options);

        app.mixin(DataTrackingMixin);
        app.mixin(RayMixin);
    },
};