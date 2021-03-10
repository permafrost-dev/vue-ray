///const { Ray } = require('node-ray/web');
import { VueRay } from './VueRay';
import errorHandler from './ErrorHandler';

export const initializeOptions = (options: any, vueConfig: any) => {
    if (options.interceptErrors === true) {
        vueConfig.errorHandler = errorHandler;
    }

    let host = 'localhost',
        port = 23517,
        scheme = 'http';

    if (typeof options['host'] === 'string') {
        host = options.host;
    }

    if (typeof options['port'] === 'number') {
        port = options.port;
    }

    if (typeof options['scheme'] === 'string') {
        scheme = options.scheme;
    }

    if (typeof options['showComponentEvents'] !== 'undefined') {
        if (Array.isArray(typeof options.showComponentEvents)) {
            VueRay.show_component_lifecycles = options.showComponentEvents;
        }
        VueRay.show_component_lifecycles = options.showComponentEvents;
    }

    VueRay.useDefaultSettings({ host, port, scheme });
};

export default initializeOptions;
