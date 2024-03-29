/* eslint-disable no-unused-vars */

import { filterObjectByKeys } from '../shared/helpers';
import { ray } from '../shared/VueRay';

export let vuexStateRay: any = null;

class VuexState {
    public state: any;

    constructor(state: any, options: RayVuexPluginOptions = {}) {
        this.state = filterObjectByKeys(Object.assign({}, state), options.trackingOptions?.propNames ?? ['one']);
    }
}

export type RayVuexPluginEventType = 'mutation' | 'action';

export type RayVuexPluginLogColor = 'blue' | 'gray' | 'green' | 'orange' | 'purple' | 'red' | 'none';

export const isRayVuexPluginNamedColor = (color?: RayVuexPluginLogColor): boolean => {
    return typeof color !== 'undefined' && color !== 'none';
};

export interface RayVuexPluginOptions {
    trackState?: boolean;
    logMutations?: boolean;
    logActions?: boolean;
    loggedMutationColor?: RayVuexPluginLogColor;
    loggedActionColor?: RayVuexPluginLogColor;
    trackingOptions?: {
        moduleNames?: string[];
        propNames?: string[];
    };
}

const DefaultVuexPluginOptions: RayVuexPluginOptions = {
    trackState: false,
    logMutations: false,
    logActions: false,
    loggedMutationColor: 'none',
    loggedActionColor: 'none',
    trackingOptions: {
        moduleNames: ['*'],
        propNames: ['*'],
    },
};

const decorateEventType = (name: RayVuexPluginEventType, color: string) => {
    return `<span class="pr-1 text-${color}-600">${name}</span>`;
};

const sendEventInfoTable = (name: RayVuexPluginEventType, color: string, data: any, rayInstance: CallableFunction | null = null) => {
    if (rayInstance === null) {
        rayInstance = () => ray();
    }

    return rayInstance().table(
        {
            'Vuex Event': decorateEventType(name, color) + ' ' + data.type,
            Payload: data.payload,
        },
        'Vuex',
    );
};

export const VuexPlugin = (options: RayVuexPluginOptions = DefaultVuexPluginOptions, rayInstance: CallableFunction | null = null) => {
    rayInstance = rayInstance ?? (() => ray());

    options = Object.assign({}, DefaultVuexPluginOptions, options);

    return (store: any) => {
        if (options.trackState) {
            store.subscribe((mutation: any, state: any) => {
                const tempState = Object.assign({}, state);
                const copiedState = Object.freeze(tempState);

                if (vuexStateRay === null) {
                    // @ts-ignore
                    vuexStateRay = rayInstance();
                }

                vuexStateRay = vuexStateRay.send(new VuexState(copiedState, options));
            });
        }

        if (options.logMutations) {
            store.subscribe((mutation: any, state: any) => {
                const r = sendEventInfoTable('mutation', 'green', mutation, rayInstance);

                if (isRayVuexPluginNamedColor(options.loggedMutationColor)) {
                    r.color(options.loggedMutationColor);
                }

                r.hide();
            });
        }

        if (options.logActions) {
            store.subscribeAction((action: any, state: any) => {
                const r = sendEventInfoTable('action', 'blue', action, rayInstance);

                if (isRayVuexPluginNamedColor(options.loggedActionColor)) {
                    r.color(options.loggedActionColor);
                }

                r.hide();
            });
        }
    };
};

export default VuexPlugin;
