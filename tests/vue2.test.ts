/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import RayVue2Plugin from '../src/RayVue2';
import { FakeRay } from './TestClasses/FakeRay';
import { FakeVm } from './TestClasses/FakeVm';

let ray: FakeRay;

beforeEach(() => {
    ray = new FakeRay();
});

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
