/* eslint-disable no-unused-vars */

import { ray } from './VueRay';

export const rayInstance = {
    handler: (...args: any[]): any => {},
};

export const setRayInstance = (instance: any) => {
    rayInstance.handler = instance;
};

export const onErrorHandler = (message: string, source: string, lineno: number, colno: number, error: any) => {
    const html = `
    <div class="flex bg-white border-0">
        <div class="flex-row bg-white text-red-400 pr-1 pl-1 border border-1 border-red-400">${message}</div>
        <div style="padding-top: 0.25em;" class="flex-row"><code>${source}</code></div>
    </div>`;

    rayInstance.handler().html(`<pre>${html}</pre>`, 'Error').small().red();
};

export const onUnhandledRejectionEventHandler = (event: any) => {
    const html = `
    <div class="flex bg-white border-0">
        <div class="flex-row bg-white text-red-400 pr-1 pl-1 border border-1 border-red-400">${event.reason}</div>
        <div style="padding-top: 0.25em;" class="flex-row"><code>${JSON.stringify(event)}</code></div>
    </div>`;

    rayInstance.handler().html(`<pre>${html}</pre>`, 'Error').small().red();
};

export const installWindowErrorHandlers = (window: any, rayFunc: any = null, onError: any = null, onUnhandled: any = null) => {
    //rayInstance.handler = rayFunc ?? ray;

    window.onerror = onError ?? onErrorHandler;
    window.unhandledrejection = onUnhandled ?? onUnhandledRejectionEventHandler;
};
