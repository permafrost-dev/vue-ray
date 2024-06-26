import { VueRay } from '@/VueRay';
import { beforeEach, describe, expect, it } from 'vitest';
import { spyOn } from '@vitest/spy';
import { ref } from 'vue';
import { FakeClient } from './TestClasses/FakeClient';

interface WatchParameters {
    cb1: CallableFunction;
    cb2: CallableFunction;
    options: Record<string, unknown>;
}

let ray: VueRay;
let client: FakeClient;
let lastWatchParams: WatchParameters | null = null;

beforeEach(() => {
    client = new FakeClient(3000, 'localhost');
    // @ts-ignore
    ray = VueRay.create(client, 'fakeUuid'); // ({ enable: true, port: 3000, host: 'localhost' }, client, 'fakeUuid');

    ray.component = {
        data: { one: 1 },
        props: { title: 'abc' },
        refs: { test1: { innerHTML: '<em>123</em>' } },
        trackingRays: {},
        trackingStops: {},
        $ray(...args: any[]) {
            // @ts-ignore
            return ray.send(...args);
        },
    };

    ray.$watch = (cb1: CallableFunction, cb2: CallableFunction, options: Record<string, unknown> = {}) => {
        lastWatchParams = {
            cb1,
            cb2,
            options,
        };

        return () => true;
    };
    // ray.$watch = watch;

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
        ray.component = { refs: { test1: { innerHTML: '<em>123</em>' } } };
        ray.element('test1');

        expect(client.sentRequests).toMatchSnapshot();
    });

    it('tracks data variables', () => {
        ray.track('one');
        lastWatchParams?.cb2();

        expect(client.sentRequests).toMatchSnapshot();
    });

    it('stops tracking data variables', () => {
        ray.track('one');
        ray.untrack('one');

        expect([...Object.keys(ray.component.trackingRays), ...Object.keys(ray.component.trackingStops)]).toMatchSnapshot();
    });

    it('watches a ref', () => {
        const r1 = ref(1);
        ray.watch('r1', r1);
        r1.value = 2;

        lastWatchParams?.cb2(2, 1);

        expect(client.sentRequests).toMatchSnapshot();
    });

    it('sends data correctly', () => {
        const sendSpy = spyOn(VueRay.prototype, 'send');
        const instance = ray;
        instance.send('test');
        expect(sendSpy).toHaveBeenCalledWith('test');
    });
});
