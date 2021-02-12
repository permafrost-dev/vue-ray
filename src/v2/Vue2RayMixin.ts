/* eslint-disable no-undef */
// @ts-nocheck
import { VueRay as Vue2Ray } from '../shared/VueRay';

export const Vue2RayMixin = {
    methods: {
        $ray(...args) {
            const ray = Vue2Ray.create();
            ray.component = this;

            ray.watch = (...args: any[]) => {
                return this.$watch(...args);
            };

            return ray.send(...args);
        },
    },
};
