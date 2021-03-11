/* eslint-disable no-undef */
// @ts-nocheck
import { VueRay as Vue2Ray } from '../shared/VueRay';

const conditionallyDisplayEvent = (eventName: string, options: Record<string, unknown>, rayInstance: any = null) => {
    if (Vue2Ray.shouldDisplayEvent(eventName)) {
        rayInstance = rayInstance ?? this.$ray ?? Vue2RayMixin.methods.$ray;

        rayInstance().table([
            `component ${eventName}: <code>${options?.name ?? 'unknown'}</code>`,
            `filename: <code>&lt;project root&gt;/${options?.__file ?? 'unknown.js'}</code>`,
        ]);
    }
};

export const Vue2RayMixin = {
    beforeCreate() {
        conditionallyDisplayEvent('before-create', this.$options);
    },

    beforeMount() {
        conditionallyDisplayEvent('before-mount', this.$options);
    },

    created() {
        conditionallyDisplayEvent('created', this.$options);
    },

    mounted() {
        conditionallyDisplayEvent('mounted', this.$options);
    },

    beforeDestroy() {
        conditionallyDisplayEvent('unmounted', this.$options);
    },

    updated() {
        conditionallyDisplayEvent('updated', this.$options);
    },

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
