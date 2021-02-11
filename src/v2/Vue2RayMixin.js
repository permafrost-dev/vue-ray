import { Vue2Ray } from './Vue2Ray';

export const Vue2RayMixin = {
    methods: {
        $ray(...args) {
            const ray = Vue2Ray.create();
            ray.component = this;
            ray.watch = ray.component.$watch;

            return ray.send(...args);
        },
    },
};
