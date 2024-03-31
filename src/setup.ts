import { RayMixin } from '@/RayMixin';
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref } from 'vue';

export type RaySetupOptions = {
    beforeMount?: boolean;
    beforeUnmount?: boolean;
    updated?: boolean;
    mounted?: boolean;
    unmounted?: boolean;
};

export function raySetup(component = null, options: RaySetupOptions = {}) {
    component = component ?? getCurrentInstance();

    for (const key of Object.keys(RayMixin.methods)) {
        component.data[key] = RayMixin.methods[key];
    }

    if (options.beforeMount) {
        onBeforeMount(() => RayMixin.beforeMount(component));
    }

    if (options.beforeUnmount) {
        onBeforeUnmount(() => RayMixin.beforeUnmount(component));
    }

    if (options.updated) {
        onUpdated(() => RayMixin.updated(component));
    }

    if (options.mounted) {
        onMounted(() => RayMixin.mounted(component));
    }

    if (options.unmounted) {
        onUnmounted(() => RayMixin.unmounted(component));
    }

    return ref(component.data.$ray);
}
