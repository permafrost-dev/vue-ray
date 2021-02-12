import { VueRay } from '../shared/VueRay';

export let vue3Watch = null;

export const Vue3RayMixin = {
    beforeCreate() {
        if (typeof vue3Watch === 'undefined' || vue3Watch === null) {
            vue3Watch = require('vue').watch;
        }
    },

    created() {
        if (VueRay.show_component_lifecycles.includes('created')) {
            // @ts-ignore
            this.$ray().table([
                // @ts-ignore
                `component created: <code>${this.$options.name}</code>`,
                // @ts-ignore
                `filename: <code>&lt;project root&gt;/${this.$options.__file}</code>`,
            ]);
        }
    },

    mounted() {
        if (VueRay.show_component_lifecycles.includes('mounted')) {
            // @ts-ignore
            this.$ray().table([
                // @ts-ignore
                `component mounted: <code>${this.$options.name}</code>`,
                // @ts-ignore
                `filename: <code>&lt;project root&gt;/${this.$options.__file}</code>`,
            ]);
        }
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

export default Vue3RayMixin;
