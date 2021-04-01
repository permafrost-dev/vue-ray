/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import VueRay, { ray } from './VueRay';

export type ERROR_TYPE = 'vue' | 'error' | 'unhandled_rejection';

export type AdditionalErrorInfoCallback = (err: any | null, ctx: any | null, type: ERROR_TYPE) => string;

export class ErrorHandler {
    public window: any;
    public ray: VueRay | any;

    public additionalInfoCallback: AdditionalErrorInfoCallback | null = null;

    constructor(callback: AdditionalErrorInfoCallback | null = null, window: any = null, rayInstance: any = null) {
        this.additionalInfoCallback = callback;
        this.ray = rayInstance ?? ray();
        this.window = window ?? globalThis;
    }

    public additionalInfo(err: any, ctx: any, type: ERROR_TYPE): string {
        return this.additionalInfoCallback ? this.additionalInfoCallback(err, ctx, type) : '';
    }

    public additionalInfoHtml(err: any, ctx: any, type: ERROR_TYPE): string {
        const info = this.additionalInfo(err, ctx, type);

        return info.length === 0 ? '' : `<div class="text-blue-500 w-full block">${info}</div>`;
    }

    public onVueError = (err: any, vm: any) => {
        const additionalInfoHtml = this.additionalInfoHtml(err, vm, 'vue');

        // pretty-print the error message and stack trace, and append any additional info provided by the callback
        const stack = err.stack
            .replace(
                /^(\w+):(.+)$/m,
                '<div class="flex bg-white border-0">' +
                    '<div class="flex-row bg-white text-red-400 pr-1 pl-1 border border-1 border-red-400">$1</div>' +
                    '<div style="padding-top: 0.25em;" class="flex-row">$2</div>' +
                    '</div>'
            )
            .replace(/\n/, 'Stack Trace:\n')
            .replace(/ at ([^ ]+) (.*)$/gm, '<div class="inline"> at <span class="text-blue-700">$1</span> $2</div>'); // eslint-disable-line

        vm.$ray().sendCustom(`<pre>${stack}${additionalInfoHtml}</pre>`, 'Error').small().red();
    };

    public onWindowError = (message: string, source: string, lineno: number, colno: number, error: any) => {
        const additionalInfoHtml = this.additionalInfoHtml(error, { message, source, lineno, colno }, 'error');

        const html = `
        <div class="flex bg-white border-0">
            <div class="flex-row bg-white text-red-400 pr-1 pl-1 border border-1 border-red-400">${message}</div>
            <div style="padding-top: 0.25em;" class="flex-row"><code>${source}</code></div>
        </div>${additionalInfoHtml}`;

        this.ray?.html(`<pre>${html}</pre>`, 'Error').small().red();
    };

    public onWindowUnhandledRejectionEvent = (event: any) => {
        const additionalInfoHtml = this.additionalInfoHtml(null, event, 'unhandled_rejection');

        const html = `
        <div class="flex bg-white border-0">
            <div class="flex-row bg-white text-red-400 pr-1 pl-1 border border-1 border-red-400">${event.reason}</div>
            <div style="padding-top: 0.25em;" class="flex-row"><code>${JSON.stringify(event)}</code></div>
        </div>${additionalInfoHtml}`;

        this.ray?.html(`<pre>${html}</pre>`, 'Error').small().red();
    };

    public installVueErrorHandler(vueConfig: any): any {
        vueConfig.errorHandler = this.onVueError;

        return vueConfig;
    }

    public installWindowErrorHandlers(onError: any = null, onUnhandled: any = null) {
        if (this.window) {
            this.window.onerror = onError ?? this.onWindowError;
            this.window.unhandledrejection = onUnhandled ?? this.onWindowUnhandledRejectionEvent;
        }
    }
}

export const errorHandler = new ErrorHandler();

export default errorHandler;
