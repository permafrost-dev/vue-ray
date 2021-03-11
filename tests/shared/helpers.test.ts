/* eslint-disable no-undef */

import { createPackageMetaProperty, encodeHtmlEntities, matchPattern } from '../../src/shared/helpers';

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
