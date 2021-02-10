/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import RayVue3Plugin from './../src/RayVue3';

test('it installs the Vue 3 plugin', () => {
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

    const fakeApp = new FakeApp();

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
