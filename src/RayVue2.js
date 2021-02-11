import { DataTrackingMixin } from './shared/DataTrackingMixin';
import { createPackageMetaProperty } from './shared/helpers';
import initializeOptions from './shared/InitializeOptions';
import { Vue2RayMixin } from './v2/Vue2RayMixin';

export default {
    install: (Vue, options) => {
        createPackageMetaProperty(Vue.prototype);

        initializeOptions(options, Vue.config);

        Vue.mixin(DataTrackingMixin);
        Vue.mixin(Vue2RayMixin);
    },
};
