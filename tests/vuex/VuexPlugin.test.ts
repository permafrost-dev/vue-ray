/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { VueRay } from '../../src/shared/VueRay';
import { FakeClient } from '../TestClasses/FakeClient';
import { FakeVuexStore } from '../TestClasses/FakeVuexStore';
import { VuexPlugin } from '../../src/vuex/VuexPlugin';

let ray: VueRay, client: FakeClient, store: FakeVuexStore;

beforeEach(() => {
    client = new FakeClient(3000, 'localhost');
    // @ts-ignore
    ray = VueRay.create(client, 'fakeUuid');

    ray.component = {
        $data: { one: 1 },
        $props: { title: 'abc' },
        $refs: { test1: { innerHTML: '<em>123</em>' } },
    };

    store = new FakeVuexStore();
});

describe('VuexPlugin:', () => {
    it('tracks the vuex state', () => {
        const plugin = VuexPlugin({ trackState: true }, () => ray);
        plugin(store);

        store.callMutationSubscriptions('testMutation', { a: 1 }, { a: 123, b: 456 });

        expect(client.sentRequests).toMatchSnapshot();
    });

    it('logs mutation events', () => {
        const plugin = VuexPlugin({ logMutations: true, loggedMutationColor: 'blue' }, () => ray);
        plugin(store);

        store.callMutationSubscriptions('testMutation', { a: 1 }, { a: 123, b: 456 });

        expect(client.sentRequests).toMatchSnapshot();
    });

    it('logs action events', () => {
        const plugin = VuexPlugin({ logActions: true, loggedActionColor: 'blue' }, () => ray);
        plugin(store);

        store.callActionSubscriptions('testAction', 12, { a: 123, b: 456 });

        expect(client.sentRequests).toMatchSnapshot();
    });
});
