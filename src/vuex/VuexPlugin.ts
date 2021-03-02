import { ray } from '../shared/VueRay';

export let vuexRay: any = null;

class VuexState {
    public state: any;

    constructor(state: any) {
        this.state = state;
    }
}

export const VuexPlugin = (store: any) => {
    store.subscribe((mutation: any, state: any) => {
        const tempState = Object.assign({}, state);
        const copiedState = Object.freeze(tempState);

        if (vuexRay === null) {
            vuexRay = ray();
        }

        vuexRay = vuexRay.send(new VuexState(copiedState));
    });
};

export default VuexPlugin;
