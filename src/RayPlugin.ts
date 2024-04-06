import { initializeOptions } from '@/InitializeOptions';
import { createPackageMetaProperty } from '@/lib/helpers';

export const RayPlugin = {
    install: (app: any, options: any) => {
        createPackageMetaProperty(app.config.globalProperties);

        initializeOptions(options, app.config);

        app.provide('ray', options);
    },
};
