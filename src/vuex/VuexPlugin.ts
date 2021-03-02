/* eslint-disable no-unused-vars */

import { ray } from '../shared/VueRay';

export let vuexStateRay: any = null;

class VuexState {
    public state: any;

    constructor(state: any) {
        this.state = state;
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
}

const DefaultVuexPluginOptions: RayVuexPluginOptions = {
    trackState: false,
    logMutations: false,
    logActions: false,
    loggedMutationColor: 'none',
    loggedActionColor: 'none',
};

const decorateEventType = (name: RayVuexPluginEventType, color: string) => {
    return `<span class="pr-1 text-${color}-600">${name}</span>`;
};

const sendEventInfoTable = (name: RayVuexPluginEventType, color: string, data: any) => {
    return ray().table(
        {
            'Vuex Event': decorateEventType(name, color) + ' ' + data.type,
            Payload: data.payload,
        },
        'Vuex'
    );
};

export const VuexPlugin = (options: RayVuexPluginOptions = DefaultVuexPluginOptions) => {
    options = Object.assign({}, DefaultVuexPluginOptions, options);

    return (store: any) => {
        if (options.trackState) {
            store.subscribe((mutation: any, state: any) => {
                const tempState = Object.assign({}, state);
                const copiedState = Object.freeze(tempState);

                if (vuexStateRay === null) {
                    vuexStateRay = ray();
                }

                vuexStateRay = vuexStateRay.send(new VuexState(copiedState));
            });
        }

        if (options.logMutations) {
            store.subscribe((mutation: any, state: any) => {
                const r = sendEventInfoTable('mutation', 'green', mutation);

                if (isRayVuexPluginNamedColor(options.loggedMutationColor)) {
                    r.color(options.loggedMutationColor);
                }
            });
        }

        if (options.logActions) {
            store.subscribeAction((action: any, state: any) => {
                const r = sendEventInfoTable('action', 'blue', action);

                if (isRayVuexPluginNamedColor(options.loggedActionColor)) {
                    r.color(options.loggedActionColor);
                }
            });
        }
    };
};

export default VuexPlugin;
