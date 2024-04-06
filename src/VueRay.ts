import { determineComponentNameDuringEvent } from '@/lib/helpers';
import { RayMixin } from '@/RayMixin';
import { format as prettyPrint } from '@permafrost-dev/pretty-format';
import { Ray } from 'node-ray/dist/web';
import { getCurrentInstance, type Ref, watch } from 'vue';

export class VueRay extends Ray {
    public component: any = { $data: {}, $refs: {} };
    public $watch: CallableFunction = () => {};

    public data(): void {
        if (this.component) {
            let data = Object.assign({}, this.component.data);

            // remove Vue Observers to avoid recursive issues
            delete data['trackingRays'];
            delete data['trackingStops'];

            data = Object.freeze(data);

            this.table([data], 'Data');
        }
    }

    public props(): void {
        if (this.component) {
            this.table([this.component.props]);
        }
    }

    public element(refName: string): VueRay {
        if (this.component?.refs[refName]) {
            return this.html((this.component?.refs[refName] as any).outerHTML);
        }

        return this;
    }

    public track(name: string): void {
        if (this.component && typeof this.component.trackingRays[name] === 'undefined') {
            this.component.trackingRays[name] = RayMixin.methods.$ray(this.component)(this.component.data['name']);

            const onTrackedUpdate = (value: any, previousValue: any) => {
                this.component.trackingRays[name] = this.component.trackingRays[name].sendCustom(
                    [
                        `<code style="font-weight: bold;">tracking: </code><code style="color: #16a34a;">${determineComponentNameDuringEvent(this.component.type)}.data.${name}</code>`,
                        `<hr width="33%" align="left" /><code style="color: #94a3b8;">new value: </code><code class="text-gray-500 bold font-bold">${prettyPrint(value)}</div>`,
                        `                               <code style="color: #94a3b8;">old value: </code><code class="text-gray-700">${prettyPrint(previousValue)}</code>`,
                        `<hr width="33%" align="left" /><code style="color: #94a3b8;">changed at: </code><code style="color: #60a5fa;">${new Date().toISOString()}</div>`,
                    ].join('<br>'),
                    'Tracking Data',
                );
            };

            this.component.trackingStops[name] = this.$watch(() => this.component.data[name], onTrackedUpdate, { deep: true });
        }
    }

    public untrack(name: string): void {
        if (this.component && typeof this.component.trackingStops[name] !== 'undefined') {
            this.component.trackingStops[name]();
            delete this.component.trackingStops[name];
        }

        if (this.component && typeof this.component.trackingRays[name] !== 'undefined') {
            delete this.component.trackingRays[name];
        }
    }

    public unwatch(name: string): void {
        if (this.component && typeof this.component.trackingStops[name] !== 'undefined') {
            this.component.trackingStops[name]();
            delete this.component.trackingStops[name];
        }

        if (this.component && typeof this.component.trackingRays[name] !== 'undefined') {
            delete this.component.trackingRays[name];
        }
    }

    public watch(name: string, ref: Ref<any>): void {
        if (this.component && typeof this.component.trackingRays[name] === 'undefined') {
            this.component.trackingRays[name] = RayMixin.methods.$ray(this.component)(ref.value);

            const onTrackedUpdate = (value: any, previousValue: any) => {
                this.component.trackingRays[name] = this.component.trackingRays[name].sendCustom(
                    [
                        `<code style="font-weight: bold;">watching: </code><code style="color: #16a34a;">${determineComponentNameDuringEvent(this.component.type)} ➞ Ref&lt;${name}&gt;</code>`,
                        `<hr width="33%" align="left" /><code style="color: #94a3b8;">new value: </code><code class="text-gray-500 bold font-bold">${prettyPrint(value)}</div>`,
                        `                               <code style="color: #94a3b8;">old value: </code><code class="text-gray-700">${prettyPrint(previousValue)}</code>`,
                        `<hr width="33%" align="left" /><code style="color: #94a3b8;">changed at: </code><code style="color: #60a5fa" class="text-gray-500 bold font-bold">${new Date().toISOString()}</div>`,
                    ].join('<br>'),
                    'Watching Ref',
                );
            };

            this.component.trackingStops[name] = this.$watch(ref, onTrackedUpdate, { deep: true });
        }
    }

    public static useDefaultSettings(settings: any) {
        return super.useDefaultSettings(settings);
    }

    public send(...args: any[]) {
        return super.send(...args);
    }
}

export const ray = (...args: any[]) => {
    const result = VueRay.create() as VueRay;
    result.component = getCurrentInstance();
    result.$watch = watch;

    if (!args.length) {
        return result;
    }

    result.send(...args);

    return result;
};

/**
 * Returns a ray() function that is wrapped with the component instance
 *
 * @param component
 * @returns {(...args: any[]) => VueRay}
 */
// eslint-disable-next-line no-unused-vars
export function rayWrapped(component: any): (...args: any[]) => VueRay {
    // biome-ignore lint/complexity/useArrowFunction: <explanation>
    return function (...args: any[]) {
        const result = VueRay.create() as VueRay;

        result.component = component;
        result.$watch = watch;

        if (!args.length) {
            return result;
        }

        result.send(...args);

        return result;
    };
}
