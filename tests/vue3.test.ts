/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */

import RayVue3Plugin from './../src/RayVue3';

test('it installs the Vue 3 plugin', () => {
    class FakeVue3 {
        [x: string]: any;
    }

    class FakeApp {
        public providedItems: string[] = [];

        public config = {
            globalProperties: {
                $ray: null,
            },
        };

        provide(name: string, options: any) {
            this.providedItems.push(name);
        }

        getProvided(): string[] {
            return this.providedItems;
        }

        getLastProvided(): string | undefined {
            return this.getProvided().slice(0).pop();
        }
    }

    const fakeApp = new FakeApp();

    RayVue3Plugin.install(fakeApp, {});

    expect(fakeApp.getLastProvided()).toBe('ray');

    if (fakeApp.config.globalProperties['$ray'] !== null) {
        // @ts-ignore
        const testRay: any = fakeApp.config.globalProperties['$ray'];
        expect(typeof testRay).not.toBe('undefined');
        expect(testRay().constructor.name).toBe('Ray');
    }
});
