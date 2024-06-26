/* eslint-disable no-undef */
import { VueRay } from '@/VueRay';
import { errorHandler } from '@/ErrorHandler';

export const initializeOptions = (options: any, vueConfig: any) => {
    options = options || {};

    if (typeof options?.interceptErrors === 'function') {
        errorHandler.additionalInfoCallback = options?.interceptErrors;
    }

    if (options?.interceptErrors === true || typeof options?.interceptErrors === 'function') {
        errorHandler.installVueErrorHandler(vueConfig);
        errorHandler.installWindowErrorHandlers();
    }

    let host = 'localhost';
    let port = 23517;
    let scheme = 'http';
    let enabled_callback = null;
    let sending_payload_callback = null;
    let sent_payload_callback = null;

    const nodeRaySettings = options['nodeRaySettings'] ?? {};

    options = Object.assign({ host, port, scheme, enabled_callback, sending_payload_callback, sent_payload_callback }, options);

    if (typeof options['host'] === 'string') {
        host = options.host;
    }

    if (typeof options['port'] === 'number') {
        port = options.port;
    }

    if (typeof options['scheme'] === 'string') {
        scheme = options.scheme;
    }

    if (typeof options['enabled_callback'] === 'function') {
        enabled_callback = options.enabled_callback;
    }

    if (typeof options['sending_payload_callback'] === 'function') {
        sending_payload_callback = options.sending_payload_callback;
    }

    if (typeof options['sent_payload_callback'] === 'function') {
        sent_payload_callback = options.sent_payload_callback;
    }

    VueRay.useDefaultSettings({
        host,
        port,
        scheme,
        enabled_callback,
        sending_payload_callback,
        sent_payload_callback,
        ...nodeRaySettings,
    });
};
