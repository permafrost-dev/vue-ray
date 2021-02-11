import { Vue3Ray } from './Vue3Ray';

export let vue3Watch = null;

export const Vue3RayMixin = {
    beforeCreate() {
        if (typeof vue3Watch === 'undefined' || vue3Watch === null) {
            vue3Watch = require('vue').watch;
        }
    },
    methods: {
        $ray(...args) {
            const ray = Vue3Ray.create();
            ray.component = this;
            ray.watch = vue3Watch;

            return ray.send(...args);
        },
    },
};
