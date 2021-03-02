export class FakeVuexStore {
    public mutationSubscriptions: CallableFunction[] = [];
    public actionSubscriptions: CallableFunction[] = [];

    public subscribe(cb: CallableFunction) {
        this.mutationSubscriptions.push(cb);
    }

    public subscribeAction(cb: CallableFunction) {
        this.actionSubscriptions.push(cb);
    }

    public callMutationSubscriptions(type: string, payload: any, store: Record<string, unknown>) {
        this.mutationSubscriptions.forEach(sub => {
            sub({ type, payload }, store);
        });
    }

    public callActionSubscriptions(type: string, payload: any, store: Record<string, unknown>) {
        this.actionSubscriptions.forEach(sub => {
            sub({ type, payload }, store);
        });
    }
}
