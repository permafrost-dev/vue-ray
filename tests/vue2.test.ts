/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */

import RayVue2Plugin from './../src/RayVue2';

test('it installs the Vue 2 plugin', () => {
    class FakeVue2 {
        // fake vue class
    }

    RayVue2Plugin.install(FakeVue2, {});

    // @ts-ignore
    expect(typeof FakeVue2.prototype.$ray).not.toBe('undefined');

    // @ts-ignore
    expect(new FakeVue2().$ray().constructor.name).toBe('Ray');
});
