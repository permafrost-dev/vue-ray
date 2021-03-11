/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import RayVue2Plugin from '../src/RayVue2';
import { FakeRay } from './TestClasses/FakeRay';
import { FakeVm } from './TestClasses/FakeVm';
import { Vue2RayMixin } from '../src/v2/Vue2RayMixin';
import { VueRay } from '../src/shared/VueRay';

let ray: FakeRay;

beforeEach(() => {
    ray = new FakeRay();
});

const prepareMixin = () => {
    // @ts-ignore
    Vue2RayMixin.$options = {
        name: 'test',
        __file: 'test.js',
    };

    // @ts-ignore
    Vue2RayMixin.$ray = function (...args: any[]) {
        return ray.send(...args);
    };

    Vue2RayMixin.methods = {
        $ray(...args) {
            return ray.send(...args);
        },
    };
};

class FakeVue2 {
    public $ray: any;

    // fake vue class
    static config = {
        errorHandler: null,
    };

    static mixins = {
        methods: {
            $ray: null,
        },
    };

    constructor() {
        this.$ray = FakeVue2.mixins.methods.$ray;
    }

    static mixin(obj: any) {
        FakeVue2.mixins = Object.assign({}, FakeVue2.mixins, obj);
    }
}

describe('Vue 2 Ray Plugin:', () => {
    test('it installs successfully', () => {
        RayVue2Plugin.install(FakeVue2, {});

        expect(typeof FakeVue2.mixins.methods.$ray).not.toBe('undefined');
        expect(new FakeVue2().$ray().constructor.name).toBe('VueRay');
    });

    test('it installs with the interceptErrors option successfully', () => {
        RayVue2Plugin.install(FakeVue2, { interceptErrors: true });
        const myVue = new FakeVue2();

        expect(typeof FakeVue2.mixins.methods.$ray).not.toBe('undefined');
        expect(new FakeVue2().$ray().constructor.name).toBe('VueRay');
        expect(FakeVue2.config.errorHandler).not.toBeNull();
        expect(typeof FakeVue2.config.errorHandler).toBe('function');

        const fakeVm = new FakeVm(ray);
        const myRay = fakeVm.$ray();

        // @ts-ignore
        FakeVue2.config.errorHandler({ stack: 'test error' }, fakeVm);

        expect(myRay.payloads.length).toBe(3);
        expect(myRay.payloads[0].content).toContain('test error');
        expect(myRay.payloads[1].content).toBe('small');
        expect(myRay.payloads[2].content).toBe('red');
    });
});

describe('Vue 2 Ray Mixin:', () => {
    test('it does not conditionally display events if not defined', () => {
        VueRay.show_component_lifecycles = [];

        prepareMixin();

        Vue2RayMixin.beforeCreate();
        Vue2RayMixin.beforeMount();
        Vue2RayMixin.created();
        Vue2RayMixin.mounted();
        Vue2RayMixin.beforeDestroy();
        Vue2RayMixin.updated();

        expect(ray.payloads.length).toBe(0);
    });

    test('it conditionally displays the beforeCreate event', () => {
        VueRay.show_component_lifecycles = ['before-create'];

        prepareMixin();
        Vue2RayMixin.beforeCreate();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });

    test('it conditionally displays the beforeMount event', () => {
        VueRay.show_component_lifecycles = ['before-mount'];

        prepareMixin();
        Vue2RayMixin.beforeMount();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });

    test('it conditionally displays the created & mounted events', () => {
        VueRay.show_component_lifecycles = ['created', 'mounted'];

        prepareMixin();
        Vue2RayMixin.created();
        Vue2RayMixin.mounted();

        expect(ray.payloads.length).toBe(2);
        expect(ray.payloads).toMatchSnapshot();
    });

    test('it conditionally displays the unmounted event', () => {
        VueRay.show_component_lifecycles = ['unmounted'];

        prepareMixin();
        Vue2RayMixin.beforeDestroy();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });

    test('it conditionally displays the updated event', () => {
        VueRay.show_component_lifecycles = ['updated'];

        prepareMixin();
        Vue2RayMixin.updated();

        expect(ray.payloads.length).toBe(1);
        expect(ray.payloads).toMatchSnapshot();
    });
});
