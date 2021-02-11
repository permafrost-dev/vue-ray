/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import RayVue2Plugin from './../src/RayVue2';

let ray;

beforeEach(() => {
    ray = new FakeRay();
});

class FakeVm {
    $ray(...args) {
        return ray.send(...args);
    }
}

class FakeRay {
    payloads = [];

    send(...args) {
        if (args.length) {
            this.payloads.push(
                ...args.map(arg => ({ name: 'log', content: arg, label: null }))
            );
        }
        return this;
    }

    sendCustom(data, label) {
        this.payloads.push({ name: 'custom', content: data, label });
        return this;
    }

    small() {
        this.payloads.push({ name: 'small', content: 'small', label: null });
        return this;
    }

    red() {
        this.payloads.push({ name: 'color', content: 'red', label: null });
        return this;
    }
}

class FakeVue2 {
    // fake vue class
    static config = {
        errorHandler: null,
    };

    constructor() {}
}

describe('Vue 2 Ray Plugin:', () => {
    test('it installs successfully', () => {
        RayVue2Plugin.install(FakeVue2, {});

        expect(typeof FakeVue2.prototype.$ray).not.toBe('undefined');
        expect(new FakeVue2().$ray().constructor.name).toBe('Ray');
    });

    test('it installs with the interceptErrors option successfully', () => {
        RayVue2Plugin.install(FakeVue2, { interceptErrors: true });
        const myVue = new FakeVue2();

        expect(typeof FakeVue2.prototype.$ray).not.toBe('undefined');
        expect(new FakeVue2().$ray().constructor.name).toBe('Ray');
        expect(FakeVue2.config.errorHandler).not.toBeNull();
        expect(typeof FakeVue2.config.errorHandler).toBe('function');

        const fakeVm = new FakeVm();
        const myRay = fakeVm.$ray();

        FakeVue2.config.errorHandler({ stack: 'test error' }, fakeVm);

        expect(myRay.payloads.length).toBe(3);
        expect(myRay.payloads[0].content).toContain('test error');
        expect(myRay.payloads[1].content).toBe('small');
        expect(myRay.payloads[2].content).toBe('red');
    });
});
