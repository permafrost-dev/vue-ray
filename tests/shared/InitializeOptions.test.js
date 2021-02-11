/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Ray } = require('node-ray/web');

import { initializeOptions } from './../../src/shared/InitializeOptions';

let options, vueConfig;

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

        expect(Ray.defaultSettings.host).toBe('otherhost');
    });

    it('initializes port option', () => {
        options.port = 12345;

        initializeOptions(options, vueConfig);

        expect(Ray.defaultSettings.port).toBe(12345);
    });
});
