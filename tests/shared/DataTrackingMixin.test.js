/* eslint-disable no-undef */

import { DataTrackingMixin } from '../../src/shared/DataTrackingMixin';

describe('DataTracking Mixin:', () => {
    it('returns tracking data objects as a mixin', () => {
        const obj = DataTrackingMixin.data();

        expect(typeof obj.trackingRays).toBe('object');
        expect(typeof obj.trackingStops).toBe('object');
    });
});
