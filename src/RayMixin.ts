import type { VueRay } from '@/VueRay';
import { rayWrapped } from '@/VueRay';
import { determineComponentNameDuringEvent } from '@/lib/helpers';

const displayLifecycleEvent = (eventName: string, options: Record<string, unknown>, rayInstance: any = null) => {
    rayInstance = rayInstance ?? RayMixin.methods.$ray;

    if (options.type) {
        options = options.type as any;
    }

    // don't display 'unknown' components
    if (!(options?.__file ?? false)) {
        return;
    }

    const componentName: string = determineComponentNameDuringEvent(options);

    let r: VueRay | CallableFunction = rayInstance;

    if (typeof rayInstance === 'function') {
        r = rayInstance();
    }

    (r as VueRay).table([
        `component: <code class="text-green-600 font-bold bold">${componentName}</code>`,
        `lifecycle event: <code class="text-blue-600">${eventName}</code>`,
        `filename: <code class="text-gray-700">${options?.__file ?? 'unknown.js'}</code>`,
    ]);
};

export const RayMixin = {
    beforeMount(component: any, instance: any = null) {
        displayLifecycleEvent('before-mount', component, instance);
    },

    beforeUnmount(component: any, instance: any = null) {
        displayLifecycleEvent('before-unmount', component, instance);
    },

    created(component: any, instance: any = null) {
        displayLifecycleEvent('created', component, instance);
    },

    mounted(component: any, instance: any = null) {
        displayLifecycleEvent('mounted', component, instance);
    },

    unmounted(component: any, instance: any = null) {
        displayLifecycleEvent('unmounted', component, instance);
    },

    updated(component: any, instance: any = null) {
        displayLifecycleEvent('updated', component, instance);
    },

    methods: {
        // eslint-disable-next-line
        $ray(component): (...args: any[]) => VueRay {
            return rayWrapped(component);
        },
    },
};
