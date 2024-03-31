/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { VueRay } from '../../src/VueRay';
import { initializeOptions } from '../../src/shared/InitializeOptions';

let options: any, vueConfig: any;

beforeEach(() => {
    options = { port: 12345, scheme: 'http', showComponentEvents: [] };
    vueConfig = { errorHandler: null };
});

describe('Option Initializer:', () => {
    it('initializes interceptErrors option', () => {
        options.initializeOptions = true;

        initializeOptions(options, vueConfig);

        expect(typeof vueConfig.errorHandler).toBe('object');
    });

    it('initializes host option', () => {
        options.host = 'otherhost';

        initializeOptions(options, vueConfig);

        // @ts-ignore
        expect(VueRay.defaultSettings.host).toBe('otherhost');
    });

    it('initializes port option', () => {
        options.port = 12345;

        initializeOptions(options, vueConfig);

        // @ts-ignore
        expect(VueRay.defaultSettings.port).toBe(12345);
    });

    it('initializes scheme option', () => {
        options.scheme = 'https';

        initializeOptions(options, vueConfig);

        // @ts-ignore
        expect(VueRay.defaultSettings.scheme).toBe('https');
    });

    it('initializes showComponentEvents option', () => {
        options.showComponentEvents = ['created'];

        initializeOptions(options, vueConfig);

        expect(VueRay.show_component_lifecycles).toStrictEqual(['created']);
    });
});
