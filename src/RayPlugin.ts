import { initializeOptions } from '@/InitializeOptions';
import { createPackageMetaProperty } from '@/lib/helpers';
import { rayWrapped } from '@/VueRay';
import type { App } from 'vue';

export const RayPlugin = {
    install: (app: App, options: any) => {
        createPackageMetaProperty(app.config.globalProperties);
        initializeOptions(options, app.config);

        app.provide('ray', options);
        app['$ray'] = rayWrapped(app);
    },
};
