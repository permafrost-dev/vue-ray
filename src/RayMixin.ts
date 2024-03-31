import { VueRay } from '@/VueRay';
import { determineComponentNameDuringEvent } from '@/lib/helpers';
import { watch } from 'vue';

const conditionallyDisplayEvent = (eventName: string, options: Record<string, unknown>, rayInstance: any = null) => {
    if (VueRay.shouldDisplayEvent(eventName)) {
        rayInstance = rayInstance ?? RayMixin.methods.$ray;

        // don't display 'unknown' components
        if (!(options?.__file ?? false)) {
            return;
        }

        const componentName: string = determineComponentNameDuringEvent(options);

        let r = rayInstance;

        if (typeof rayInstance === 'function') {
            r = rayInstance();
        }

        r.table([
            `component ${eventName}: <code>${componentName}</code>`,
            `filename: <code>&lt;project root&gt;/${options?.__file ?? 'unknown.js'}</code>`,
        ]);
    }
};

export const RayMixin = {
    beforeMount(component: any) {
        conditionallyDisplayEvent('before-mount', component);
    },

    beforeUnmount(component: any) {
        conditionallyDisplayEvent('before-unmount', component);
    },

    created(component: any) {
        conditionallyDisplayEvent('created', component);
    },

    mounted(component: any) {
        conditionallyDisplayEvent('mounted', component);
    },

    unmounted(component: any) {
        conditionallyDisplayEvent('unmounted', component);
    },

    updated(component: any) {
        conditionallyDisplayEvent('updated', component);
    },

    methods: {
        $ray(...args: any[]) {
            const ray = VueRay.create();
            ray.component = this;
            ray.watch = watch;

            return ray.send(...args);
        },
    },
};
