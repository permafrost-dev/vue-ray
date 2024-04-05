import { RayMixin } from '@/RayMixin';
import type { ray } from '@/VueRay';
import { rayWrapped } from '@/VueRay';
import type { Ref } from 'vue';
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref } from 'vue';

export type RaySetupLifecycleEventOptions = {
    beforeMount?: boolean;
    beforeUnmount?: boolean;
    updated?: boolean;
    mounted?: boolean;
    unmounted?: boolean;
    all?: boolean;
};

export type RaySetupOptions = {
    lifecycleEvents?: RaySetupLifecycleEventOptions;
    lifecycleMethods?: RaySetupOptionsVueLifecycleMethods;
};

export type RaySetupOptionsVueLifecycleMethods = {
    beforeMount?: typeof onBeforeMount;
    beforeUnmount?: typeof onBeforeUnmount;
    updated?: typeof onUpdated;
    mounted?: typeof onMounted;
    unmounted?: typeof onUnmounted;
};

export function raySetup(component = null, options: RaySetupOptions = {}): Ref<typeof ray> {
    component = component ?? getCurrentInstance();

    const $ray = rayWrapped(component);

    component.$ray = $ray;

    options.lifecycleEvents = options.lifecycleEvents ?? {};
    options.lifecycleEvents.all = options.lifecycleEvents?.all ?? false;

    if (options.lifecycleEvents.all === true) {
        options.lifecycleEvents.beforeMount = true;
        options.lifecycleEvents.beforeUnmount = true;
        options.lifecycleEvents.updated = true;
        options.lifecycleEvents.mounted = true;
        options.lifecycleEvents.unmounted = true;
    }

    if (options.lifecycleEvents.beforeMount) {
        const callback = options.lifecycleMethods?.beforeMount ?? onBeforeMount;
        callback(() => RayMixin.beforeMount(component, $ray()));
    }

    if (options.lifecycleEvents.beforeUnmount) {
        const callback = options.lifecycleMethods?.beforeUnmount ?? onBeforeUnmount;
        callback(() => RayMixin.beforeUnmount(component, $ray()));
    }

    if (options.lifecycleEvents.updated) {
        const callback = options.lifecycleMethods?.updated ?? onUpdated;
        callback(() => RayMixin.updated(component, $ray()));
    }

    if (options.lifecycleEvents.mounted) {
        const callback = options.lifecycleMethods?.mounted ?? onMounted;
        callback(() => RayMixin.mounted(component, $ray()));
    }

    if (options.lifecycleEvents.unmounted) {
        const callback = options.lifecycleMethods?.unmounted ?? onUnmounted;
        callback(() => RayMixin.unmounted(component, $ray()));
    }

    return ref(component.$ray);
}
