/* eslint-disable no-undef */

import { createPackageMetaProperty } from '../../src/shared/helpers';

it('creates a package meta property', () => {
    const obj = { $rayMeta: null };

    createPackageMetaProperty(obj);

    expect(obj.$rayMeta).not.toBeNull();
    expect(obj.$rayMeta.NAME).not.toBeUndefined();
    expect(obj.$rayMeta.VERSION).not.toBeUndefined();
});
