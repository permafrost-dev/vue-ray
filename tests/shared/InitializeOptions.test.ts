/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { VueRay } from '../../src/shared/VueRay';
import { initializeOptions } from '../../src/shared/InitializeOptions';

let options: any, vueConfig: any;

beforeEach(() => {
    options = {};
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

        expect(VueRay.defaultSettings.host).toBe('otherhost');
    });

    it('initializes port option', () => {
        options.port = 12345;

        initializeOptions(options, vueConfig);

        expect(VueRay.defaultSettings.port).toBe(12345);
    });

    it('initializes showComponentEvents option', () => {
        options.showComponentEvents = ['created'];

        initializeOptions(options, vueConfig);

        expect(VueRay.show_component_lifecycles).toStrictEqual(['created']);
    });
});
