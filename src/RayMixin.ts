import { VueRay } from '@/VueRay';
import { determineComponentNameDuringEvent } from '@/lib/helpers';

export let vue3Watch = null;

const conditionallyDisplayEvent = (eventName: string, options: Record<string, unknown>, rayInstance: any = null) => {
    if (VueRay.shouldDisplayEvent(eventName)) {
        rayInstance = rayInstance ?? RayMixin.methods.$ray;

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

export const RayMixin = {
    $options: {},

    beforeCreate() {
        if (typeof vue3Watch === 'undefined' || vue3Watch === null) {
            vue3Watch = require('vue').watch;
        }

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

    unmounted() {
        conditionallyDisplayEvent('unmounted', this.$options);
    },

    updated() {
        conditionallyDisplayEvent('updated', this.$options);
    },

    methods: {
        $ray(...args: any[]) {
            const ray = VueRay.create();
            ray.component = this;
            ray.watch = vue3Watch;

            return ray.send(...args);
        },
    },
};
