/* eslint-disable no-unused-vars */

const { Ray } = require('node-ray/web');

export class VueRay extends Ray {
    data() {
        if (this.component) {
            this.table([this.component.$data]);
        }
    }

    props() {
        if (this.component) {
            this.table([this.component.$props]);
        }
    }

    ref(name) {
        if (this.component) {
            this.html(this.component.$refs[name].innerHTML);
        }
    }

    track(name) {
        if (this.component && typeof this.component.trackingRays[name] === 'undefined') {
            this.component.trackingRays[name] = this.component.$ray(name);

            const onTrackedUpdate = (value, previousValue) => {
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

            this.component.trackingStops[name] = this.watch(`$data.${name}`, onTrackedUpdate, { deep: true });
        }
    }

    untrack(name) {
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
}

export default VueRay;
