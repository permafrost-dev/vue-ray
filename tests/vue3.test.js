/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import RayVue3Plugin from './../src/RayVue3';

let ray, fakeApp;

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

class FakeVue3 {
    //
}

class FakeApp {
    constructor() {
        this.providedItems = [];
        this.config = {
            globalProperties: {
                $ray: null,
            },
            errorHandler: null,
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
}

beforeEach(() => {
    ray = new FakeRay();
    fakeApp = new FakeApp();
});

test('it installs the Vue 3 plugin', () => {
    RayVue3Plugin.install(fakeApp, {});

    expect(fakeApp.getLastProvided()).toBe('ray');
    expect(fakeApp.getProvided().length).toBe(1);
    expect(fakeApp.config.globalProperties['$ray']).not.toBe(null);

    if (fakeApp.config.globalProperties['$ray'] !== null) {
        const testRay = fakeApp.config.globalProperties['$ray'];

        expect(typeof testRay).not.toBe('undefined');
        expect(testRay().constructor.name).toBe('Ray');
    }
});

test('it installs the Vue 3 plugin with the interceptErrors option', () => {
    RayVue3Plugin.install(fakeApp, { interceptErrors: true });

    expect(fakeApp.getLastProvided()).toBe('ray');
    expect(fakeApp.getProvided().length).toBe(1);
    expect(fakeApp.config.globalProperties['$ray']).not.toBe(null);
    expect(fakeApp.config.errorHandler).not.toBeNull();
    expect(typeof fakeApp.config.errorHandler).toBe('function');

    const fakeVm = new FakeVm();
    fakeApp.config.errorHandler({ stack: 'test error' }, fakeVm);

    expect(ray.payloads.length).toBe(3);
    expect(ray.payloads[0].content).toContain('test error');
    expect(ray.payloads[1].content).toBe('small');
    expect(ray.payloads[2].content).toBe('red');
});
