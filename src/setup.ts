import { RayMixin } from '@/RayMixin';
import { ray, rayWrapped } from '@/VueRay';
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, onUpdated, Ref, ref } from 'vue';

export type RaySetupOptions = {
    beforeMount?: boolean;
    beforeUnmount?: boolean;
    updated?: boolean;
    mounted?: boolean;
    unmounted?: boolean;
};

export function raySetup(component = null, options: RaySetupOptions = {}): Ref<typeof ray> {
    component = component ?? getCurrentInstance();

    const $ray = rayWrapped(component);

    component.$ray = $ray;

    if (options.beforeMount) {
        onBeforeMount(() => RayMixin.beforeMount(component, $ray()));
    }

    if (options.beforeUnmount) {
        onBeforeUnmount(() => RayMixin.beforeUnmount(component, $ray()));
    }

    if (options.updated) {
        onUpdated(() => RayMixin.updated(component, $ray()));
    }

    if (options.mounted) {
        onMounted(() => RayMixin.mounted(component, $ray()));
    }

    if (options.unmounted) {
        onUnmounted(() => RayMixin.unmounted(component, $ray()));
    }

    return ref(component.$ray);
}
