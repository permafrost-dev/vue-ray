/* eslint-disable no-unused-vars */
import { initializeOptions } from '@/InitializeOptions';
import { RayMixin } from '@/RayMixin';
import { RayPlugin } from '@/RayPlugin';
import { VueRay } from '@/VueRay';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';

describe('RayMixin', () => {
    it('adds a $ray method to components', () => {
        const app = createApp({});

        const wrapper = app.use(RayPlugin);

        expect(wrapper.$ray).toBeDefined();
    });
});
