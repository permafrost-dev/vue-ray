const { Ray } = require('node-ray/web');
import errorHandler from './ErrorHandler';

export const initializeOptions = (options, vueConfig) => {
    if (options.interceptErrors === true) {
        vueConfig.errorHandler = errorHandler;
    }

    let host = 'localhost',
        port = 23517;

    if (typeof options['host'] === 'string') {
        host = options.host;
    }

    if (typeof options['port'] === 'number') {
        port = options.port;
    }

    Ray.useDefaultSettings({ host, port });
};

export default initializeOptions;
