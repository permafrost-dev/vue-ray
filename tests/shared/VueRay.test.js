/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { VueRay } from '../../src/shared/VueRay';
import { FakeClient } from '../TestClasses/FakeClient';

let ray, client;

beforeEach(() => {
    client = new FakeClient(3000, 'localhost');
    ray = VueRay.create(client, 'fakeUuid'); // ({ enable: true, port: 3000, host: 'localhost' }, client, 'fakeUuid');

    ray.component = {
        $data: { one: 1 },
        $props: { title: 'abc' },
        $refs: { test1: { innerHTML: '<em>123</em>' } },
    };

    ray.data();
});

describe('Base VueRay class:', () => {
    it('sends the component data', () => {
        ray.data();

        expect(client.sentRequests).toMatchSnapshot();
    });

    it('sends the component props', () => {
        ray.props();

        expect(client.sentRequests).toMatchSnapshot();
    });

    it('sends a refs innerHTML', () => {
        ray.ref('test1');

        expect(client.sentRequests).toMatchSnapshot();
    });
});
