/* eslint-disable no-unused-vars */
import { ErrorHandler } from '@/ErrorHandler';
import { beforeEach, describe, expect, it } from 'vitest';
import { FakeRay } from './TestClasses/FakeRay';

let options: any, window: any, rayInstance: FakeRay, vueConfig: any, errorHandler: ErrorHandler;

beforeEach(() => {
    options = {};
    vueConfig = { errorHandler: null };
    window = { onerror: null, unhandledrejection: null };
    rayInstance = new FakeRay();
});

describe('Error Handler:', () => {
    it('returns additional info from the callback', () => {
        errorHandler = new ErrorHandler((...args) => 'test', window, rayInstance);

        expect(errorHandler.additionalInfo(null, null, 'error')).toBe('test');
    });

    it('returns an empty string for additional info when the callback is null', () => {
        errorHandler = new ErrorHandler(null, window, rayInstance);

        expect(errorHandler.additionalInfo(null, null, 'error')).toBe('');
    });

    it('returns additional info html', () => {
        errorHandler = new ErrorHandler((...args) => 'test', window, rayInstance);

        const html = errorHandler.additionalInfoHtml(null, null, 'error');

        expect(html).toContain('<div');
        expect(html).toContain('</div>');
        expect(html).toContain('>test<');
    });

    it('returns an empty string as additional info html when the callback is null', () => {
        errorHandler = new ErrorHandler(null, window, rayInstance);

        expect(errorHandler.additionalInfoHtml(null, null, 'error')).toBe('');
    });

    it('sends an html payload and appends the callback result when handling vue errors', () => {
        errorHandler = new ErrorHandler((...args) => '---CUSTOM_DATA---', window, rayInstance);

        errorHandler.onVueError(
            { stack: '' },
            {
                $ray(...args: any[]) {
                    return rayInstance.send(...args);
                },
            },
        );

        expect(rayInstance.payloads).toMatchSnapshot();
        expect(rayInstance.payloads[0].content).toContain('---CUSTOM_DATA---');
    });

    it('sends an html payload and appends the callback result when handling window errors', () => {
        errorHandler = new ErrorHandler((...args) => '---CUSTOM_DATA---', window, rayInstance);

        errorHandler.onWindowError('message', 'source', 1, 1, {});

        expect(rayInstance.payloads).toMatchSnapshot();
        expect(rayInstance.payloads[0].content).toContain('---CUSTOM_DATA---');
    });

    it('sends an html payload and appends the callback result when handling window unhandled rejection event errors', () => {
        errorHandler = new ErrorHandler((...args) => '---CUSTOM_DATA---', window, rayInstance);

        errorHandler.onWindowUnhandledRejectionEvent({ reason: 'some-data' });

        expect(rayInstance.payloads).toMatchSnapshot();
        expect(rayInstance.payloads[0].content).toContain('---CUSTOM_DATA---');
    });

    it('installs the vue error handler', () => {
        errorHandler = new ErrorHandler(null, window, rayInstance);

        expect(vueConfig.errorHandler).toBeNull();

        errorHandler.installVueErrorHandler(vueConfig);

        expect(vueConfig.errorHandler).not.toBeNull();
    });

    it('installs the default window error handlers', () => {
        errorHandler = new ErrorHandler(null, window, rayInstance);

        errorHandler.installWindowErrorHandlers(null, null);

        expect(window.onerror).toBe(errorHandler.onWindowError);
        expect(window.unhandledrejection).toBe(errorHandler.onWindowUnhandledRejectionEvent);
    });

    it('installs custom window error handlers', () => {
        errorHandler = new ErrorHandler(null, window, rayInstance);

        const customErrorHandler1 = function (...args: any[]) {
            return false;
        };

        const customErrorHandler2 = function (...args: any[]) {
            return false;
        };

        errorHandler.installWindowErrorHandlers(customErrorHandler1, customErrorHandler2);

        expect(window.onerror).toBe(customErrorHandler1);
        expect(window.unhandledrejection).toBe(customErrorHandler2);
    });
});
