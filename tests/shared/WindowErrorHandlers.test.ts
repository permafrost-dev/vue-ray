/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { VueRay } from '../../src/shared/VueRay';
import { FakeClient } from '../TestClasses/FakeClient';

import {
    setRayInstance,
    onErrorHandler,
    onUnhandledRejectionEventHandler,
    installWindowErrorHandlers,
} from '../../src/shared/WindowErrorHandlers';

let ray: VueRay, client: FakeClient;

beforeEach(() => {
    client = new FakeClient(3000, 'localhost');
    // @ts-ignore
    ray = VueRay.create(client, 'fakeUuid');

    ray.component = {
        $data: { one: 1 },
        $props: { title: 'abc' },
        $refs: { test1: { innerHTML: '<em>123</em>' } },
        trackingRays: {},
        trackingStops: {},
        $ray(...args: any[]) {
            // @ts-ignore
            return ray.send(...args);
        },
    };

    setRayInstance(ray.component.$ray);

    ray.data();
});

it('installs error handlers onto the window object', () => {
    const win = {
        onerror: null,
        unhandledrejection: null,
    };

    installWindowErrorHandlers(win, ray);

    expect(win.onerror).not.toBeNull();
    expect(win.unhandledrejection).not.toBeNull();
});

it('sends window errors to ray', () => {
    const win = {
        onerror: null,
        unhandledrejection: null,
    };

    installWindowErrorHandlers(win);

    onErrorHandler('test', 'source test', 12, 2, {});

    expect(client.sentPayloads().length).toBeGreaterThan(0);
    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends unhandled rejection errors to ray', () => {
    const win = {
        onerror: null,
        unhandledrejection: null,
    };

    const event = {
        reason: 'test',
    };

    installWindowErrorHandlers(win);

    onUnhandledRejectionEventHandler(event);

    expect(client.sentPayloads().length).toBeGreaterThan(0);
    expect(client.sentPayloads()).toMatchSnapshot();
});
