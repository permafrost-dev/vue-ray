/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import RayVue3Plugin from '../src/RayVue3';
import { FakeRay } from './TestClasses/FakeRay';
import { FakeVm } from './TestClasses/FakeVm';
import { Vue3RayMixin } from '../src/v3/Vue3RayMixin';
import { VueRay } from '../src/shared/VueRay';

let ray: FakeRay, fakeApp: FakeApp;

class FakeApp {
    public providedItems: any[] = [];
    public config: any;
    public mixins: any = {};

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

    provide(name: any, options: any) {
        this.providedItems.push(name);
    }

    getProvided() {
        return this.providedItems;
    }

    getLastProvided() {
        return this.getProvided().slice(0).pop();
    }

    mixin(obj: any) {
        this.mixins = Object.assign({}, this.mixins, obj);
    }
}

beforeEach(() => {
    ray = new FakeRay();
    fakeApp = new FakeApp();
});

const prepareMixin = () => {
    // @ts-ignore
    Vue3RayMixin.$options = {
        name: 'test',
        __file: 'test.js',
    };

    // @ts-ignore
    Vue3RayMixin.$ray = function (...args: any[]) {
        return ray.send(...args);
    };

    Vue3RayMixin.methods = {
        $ray(...args: any[]) {
            return ray.send(...args);
        },
    };
};

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

describe('Vue 3 Mixin:', () => {
    test('it does not conditionally display events if not defined', () => {
        VueRay.show_component_lifecycles = [];

        prepareMixin();

        //Vue3RayMixin.beforeCreate();
        Vue3RayMixin.beforeMount();
        Vue3RayMixin.created();
        Vue3RayMixin.mounted();
        Vue3RayMixin.unmounted();
        Vue3RayMixin.updated();

        expect(ray.payloads.length).toBe(0);
    });

    test('it conditionally displays the beforeMount event', () => {
        VueRay.show_component_lifecycles = ['before-mount'];

        prepareMixin();
        Vue3RayMixin.beforeMount();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });

    test('it conditionally displays the created & mounted events', () => {
        VueRay.show_component_lifecycles = ['created', 'mounted'];

        prepareMixin();
        Vue3RayMixin.created();
        Vue3RayMixin.mounted();

        expect(ray.payloads.length).toBe(2);
        expect(ray.payloads).toMatchSnapshot();
    });

    test('it conditionally displays the unmounted event', () => {
        VueRay.show_component_lifecycles = ['unmounted'];

        prepareMixin();
        Vue3RayMixin.unmounted();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });

    test('it conditionally displays the updated event', () => {
        VueRay.show_component_lifecycles = ['updated'];

        prepareMixin();
        Vue3RayMixin.updated();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });
});
