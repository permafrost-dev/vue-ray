/* eslint-disable no-unused-vars */

// @ts-ignore
import { Ray } from 'node-ray/dist/web';

export class VueRay extends Ray {
    public static show_component_lifecycles: string[] = [];
    public component: any = { $data: {}, $refs: {} };
    public watch: CallableFunction = () => {};

    public data(): void {
        if (this.component) {
            let data = Object.assign({}, this.component.$data);

            // remove Vue Observers to avoid recursive issues
            delete data['trackingRays'];
            delete data['trackingStops'];

            data = Object.freeze(data);

            this.table([data], 'Data');
        }
    }

    public props(): void {
        if (this.component) {
            this.table([this.component.$props]);
        }
    }

    public ref(name: string): void {
        if (this.component) {
            this.html(this.component.$refs[name].innerHTML);
        }
    }

    public track(name: string): void {
        if (this.component && typeof this.component.trackingRays[name] === 'undefined') {
            this.component.trackingRays[name] = this.component.$ray(name);

            const onTrackedUpdate = (value: any, previousValue: any) => {
                this.component.trackingRays[name] = this.component.trackingRays[name].send({
                    info: {
                        variable: name,
                        tracking: true,
                    },
                    trackingData: {
                        value: value,
                        previous: previousValue,
                    },
                });
            };

            this.component.trackingStops[name] = this.watch(() => this.component[name], onTrackedUpdate, { deep: true });
        }
    }

    public untrack(name: string): void {
        if (this.component && typeof this.component.trackingStops[name] !== 'undefined') {
            this.component.trackingRays[name] = this.component.trackingRays[name].send({
                info: {
                    variable: name,
                    tracking: false,
                },
                trackedData: {
                    value: this.component[name],
                },
            });

            this.component.trackingStops[name]();

            delete this.component.trackingStops[name];
            delete this.component.trackingRays[name];
        }
    }

    public static shouldDisplayEvent(name: string): boolean {
        return VueRay.show_component_lifecycles.includes(name);
    }

    public static showComponentLifecycles(names: string[]): void {
        if (Array.isArray(VueRay.show_component_lifecycles)) {
            VueRay.show_component_lifecycles.push(...names);
        }
    }

    public static stopShowingComponentLifecycles(names: string[] = []): void {
        if (!names.length) {
            VueRay.show_component_lifecycles = [];
            return;
        }

        VueRay.show_component_lifecycles = VueRay.show_component_lifecycles.filter(name => !names.includes(name));
    }

    public static useDefaultSettings(settings: any) {
        return super.useDefaultSettings(settings);
    }

    public send(...args: any[]) {
        return super.send(...args);
    }
}

export const ray = (...args: any[]) => {
    if (!args.length) {
        return VueRay.create();
    }

    return VueRay.create().send(...args);
};
