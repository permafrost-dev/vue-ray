import { Ray } from 'node-ray';
import { RayVueOptions, mergeOptionsWithDefaults } from './options';

export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$ray = (...args: any[]) => {
            const opts: RayVueOptions = mergeOptionsWithDefaults(<RayVueOptions>options);

            return new Ray(opts.host, opts.port).send(...args);
        };

        app.provide('ray', options);
    },
};

