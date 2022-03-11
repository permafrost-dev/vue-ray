/* eslint-disable no-undef */

import { createPackageMetaProperty, determineComponentNameDuringEvent, encodeHtmlEntities, matchPattern } from '../../src/shared/helpers';

it('creates a package meta property', () => {
    const obj: any = { $rayMeta: null };

    createPackageMetaProperty(obj);

    expect(obj.$rayMeta).not.toBeNull();
    expect(obj.$rayMeta.NAME).not.toBeUndefined();
    expect(obj.$rayMeta.VERSION).not.toBeUndefined();
});

it('encodes html entities', () => {
    expect(encodeHtmlEntities('<p>')).toBe('&lt;p&gt;');
});

it('matches patterns', () => {
    expect(matchPattern('test', ['te*', 'a*'])).toBeTruthy();
    expect(matchPattern('test', ['*t', 't*a'])).toBeTruthy();
    expect(matchPattern('test', ['x*', 'a*'])).toBeFalsy();
});

it('gets component names during events', () => {
    expect(determineComponentNameDuringEvent({ name: 'Test', __file: '/project/src/HelloWorld.vue' })).toBe('Test');
    expect(determineComponentNameDuringEvent({ name: 'unknown', __file: '/project/src/HelloWorld.vue' })).toBe('HelloWorld');
    expect(determineComponentNameDuringEvent({ __file: '/project/src/components/HelloWorld.vue' })).toBe('HelloWorld');
    expect(determineComponentNameDuringEvent({})).toBe('unknown');
});
