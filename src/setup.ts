import { RayMixin } from '@/RayMixin';
import { getCurrentInstance, ref } from 'vue';

export function raySetup() {
    const component = getCurrentInstance();

    for (const key of Object.keys(RayMixin.methods)) {
        component.data[key] = RayMixin.methods[key];
    }

    const rayInstance = ref(component.data.$ray);

    return rayInstance;
}
