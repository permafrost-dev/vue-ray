/* eslint-disable no-undef */
// @ts-nocheck
import { VueRay as Vue2Ray } from '../shared/VueRay';
import { determineComponentNameDuringEvent } from '../shared/helpers';

const conditionallyDisplayEvent = (eventName: string, options: Record<string, unknown>, rayInstance: any = null) => {
    if (Vue2Ray.shouldDisplayEvent(eventName)) {
        rayInstance = rayInstance ?? Vue2RayMixin.methods.$ray;

        // don't display 'unknown' components
        if (!(options?.__file ?? false)) {
            return;
        }

        const componentName: string = determineComponentNameDuringEvent(options);

        rayInstance().table([
            `component ${eventName}: <code>${componentName}</code>`,
            `filename: <code>&lt;project root&gt;/${options?.__file ?? 'unknown.js'}</code>`,
        ]);
    }
};

export const Vue2RayMixin = {
    beforeCreate() {
        conditionallyDisplayEvent('before-create', this.$options, this.$ray);
    },

    beforeMount() {
        conditionallyDisplayEvent('before-mount', this.$options, this.$ray);
    },

    created() {
        conditionallyDisplayEvent('created', this.$options, this.$ray);
    },

    mounted() {
        conditionallyDisplayEvent('mounted', this.$options, this.$ray);
    },

    beforeDestroy() {
        conditionallyDisplayEvent('unmounted', this.$options, this.$ray);
    },

    updated() {
        conditionallyDisplayEvent('updated', this.$options, this.$ray);
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
