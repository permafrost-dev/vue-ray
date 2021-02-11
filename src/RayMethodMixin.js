import VueRay from './VueRay';

const rayMethodMixin = {
    $ray(...args) {
        const ray = VueRay.create();
        ray.component = this;

        return ray.send(...args);
    },
};

export default rayMethodMixin;
