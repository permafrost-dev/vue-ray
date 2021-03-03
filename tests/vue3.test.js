/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import RayVue3Plugin from './../src/RayVue3';
import { FakeRay } from './TestClasses/FakeRay';
import { FakeVm } from './TestClasses/FakeVm';

let ray, fakeApp;

class FakeApp {
    constructor() {
        this.providedItems = [];
        this.config = {
            globalProperties: {
                $ray: null,
            },
            errorHandler: null,
        };

        this.mixins = {};
        this.mixins.methods = {
            $ray: null,
        };
    }

    provide(name, options) {
        this.providedItems.push(name);
    }

    getProvided() {
        return this.providedItems;
    }

    getLastProvided() {
        return this.getProvided().slice(0).pop();
    }

    mixin(obj) {
        this.mixins = Object.assign({}, this.mixins, obj);
    }
}

beforeEach(() => {
    ray = new FakeRay();
    fakeApp = new FakeApp();
});

describe('Vue 3 Ray Plugin:', () => {
    test('it installs successfully', () => {
        RayVue3Plugin.install(fakeApp, {});

        expect(fakeApp.getLastProvided()).toBe('ray');
        expect(fakeApp.getProvided().length).toBe(1);
        //expect(fakeApp.config.globalProperties['$ray']).not.toBe(null);
        expect(fakeApp.mixins.methods.$ray).not.toBe(null);

        if (fakeApp.mixins.methods.$ray !== null) {
            const testRay = fakeApp.mixins.methods.$ray;

            expect(typeof testRay).not.toBe('undefined');
            expect(testRay().constructor.name).toBe('VueRay');
        }
    });

    test('it installs successfully with the interceptErrors option', () => {
        RayVue3Plugin.install(fakeApp, { interceptErrors: true });

        expect(fakeApp.getLastProvided()).toBe('ray');
        expect(fakeApp.getProvided().length).toBe(1);
        expect(fakeApp.mixins.methods.$ray).not.toBe(null);
        expect(fakeApp.config.errorHandler).not.toBeNull();
        expect(typeof fakeApp.config.errorHandler).toBe('function');

        const fakeVm = new FakeVm(ray);
        fakeApp.config.errorHandler({ stack: 'test error' }, fakeVm);

        expect(ray.payloads.length).toBe(3);
        expect(ray.payloads[0].content).toContain('test error');
        expect(ray.payloads[1].content).toBe('small');
        expect(ray.payloads[2].content).toBe('red');
    });
});
