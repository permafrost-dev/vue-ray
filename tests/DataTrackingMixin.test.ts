import { DataTrackingMixin } from '@/DataTrackingMixin';
import { describe, expect, it } from 'vitest';

describe('DataTracking Mixin:', () => {
    it('returns tracking data objects as a mixin', () => {
        const obj = DataTrackingMixin.data();

        expect(typeof obj.trackingRays).toBe('object');
        expect(typeof obj.trackingStops).toBe('object');
    });
});
