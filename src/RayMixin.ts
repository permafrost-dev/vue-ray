import { rayWrapped, VueRay } from '@/VueRay';
import { determineComponentNameDuringEvent } from '@/lib/helpers';

const conditionallyDisplayEvent = (eventName: string, options: Record<string, unknown>, rayInstance: any = null) => {
    if (VueRay.shouldDisplayEvent(eventName)) {
        rayInstance = rayInstance ?? RayMixin.methods.$ray;

        if (options.type) {
            options = options.type as any;
        }

        // don't display 'unknown' components
        // if (!(options?.__file ?? false)) {
        //     return;
        // }

        console.log('options===', options);

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
    beforeMount(component: any, instance: any = null) {
        conditionallyDisplayEvent('before-mount', component, instance);
    },

    beforeUnmount(component: any, instance: any = null) {
        conditionallyDisplayEvent('before-unmount', component, instance);
    },

    created(component: any, instance: any = null) {
        conditionallyDisplayEvent('created', component, instance);
    },

    mounted(component: any, instance: any = null) {
        conditionallyDisplayEvent('mounted', component, instance);
    },

    unmounted(component: any, instance: any = null) {
        conditionallyDisplayEvent('unmounted', component, instance);
    },

    updated(component: any, instance: any = null) {
        conditionallyDisplayEvent('updated', component, instance);
    },

    methods: {
        // eslint-disable-next-line
        $ray(component): (...args: any[]) => VueRay {
            // const component = getCurrentInstance();
            const r = rayWrapped(component); //VueRay.create();
            // r.component = component;
            // // ray.component = component;
            // r.watch = watch;

            // r.send(...args);

            return r;
        },
    },
};
