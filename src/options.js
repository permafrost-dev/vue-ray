export function mergeOptionsWithDefaults(options) {
    return Object.assign({ enable: true, host: 'localhost', port: 23517 }, options);
}
