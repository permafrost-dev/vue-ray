/* eslint-disable no-unused-vars */
import { VueRay } from '@/VueRay';
import { beforeEach, describe, expect, it } from 'vitest';
import { FakeRay } from './TestClasses/FakeRay';
import { FakeVm } from './TestClasses/FakeVm';
import { RayMixin } from '@/RayMixin';
import { RayPlugin } from '@/RayPlugin';

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

    provide(name: any) {
        this.providedItems.push(name);
    }

    getProvided() {
        return this.providedItems;
    }

    getLastProvided() {
        return this.getProvided().slice(0)
            .pop();
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
    RayMixin.$options = {
        name: 'test',
        __file: 'test.js',
    };

    // @ts-ignore
    RayMixin.$ray = function (...args: any[]) {
        return ray.send(...args);
    };

    RayMixin.methods = {
        // @ts-ignore
        $ray(...args: any[]) {
            return ray.send(...args);
        },
    };
};

describe('Vue 3 Ray Plugin:', () => {
    it('installs successfully', () => {
        RayPlugin.install(fakeApp, {});

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

    it('installs successfully with the interceptErrors option', () => {
        RayPlugin.install(fakeApp, { interceptErrors: true });

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
    it('does not conditionally display events if not defined', () => {
        VueRay.show_component_lifecycles = [];

        prepareMixin();

        //RayMixin.beforeCreate();
        RayMixin.beforeMount();
        RayMixin.created();
        RayMixin.mounted();
        RayMixin.unmounted();
        RayMixin.updated();

        expect(ray.payloads.length).toBe(0);
    });

    it('conditionally displays the beforeMount event', () => {
        VueRay.show_component_lifecycles = ['before-mount'];

        prepareMixin();
        RayMixin.beforeMount();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });

    it('conditionally displays the created & mounted events', () => {
        VueRay.show_component_lifecycles = ['created', 'mounted'];

        prepareMixin();
        RayMixin.created();
        RayMixin.mounted();

        expect(ray.payloads.length).toBe(2);
        expect(ray.payloads).toMatchSnapshot();
    });

    it('conditionally displays the unmounted event', () => {
        VueRay.show_component_lifecycles = ['unmounted'];

        prepareMixin();
        RayMixin.unmounted();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });

    it('conditionally displays the updated event', () => {
        VueRay.show_component_lifecycles = ['updated'];

        prepareMixin();
        RayMixin.updated();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });
});
