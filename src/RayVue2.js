import initializeOptions from './shared/InitializeOptions';
import PackageInfo from './shared/PackageInfo';
import rayMethodMixin from './shared/RayMethodMixin';

export default {
    install: function (Vue, options) {
        Vue.prototype.$rayVersion = PackageInfo.VERSION;

        initializeOptions(options, Vue.config);

        Vue.mixin({
            methods: rayMethodMixin,
        });
    },
};
