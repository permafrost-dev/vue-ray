export class FakeRay {
    public payloads: any[] = [];

    send(...args: any[]) {
        if (args.length) {
            this.payloads.push(...args.map(arg => ({ name: 'log', content: arg, label: null }))); // eslint-disable-line
        }
        return this;
    }

    sendCustom(data: any, label: any) {
        this.payloads.push({ name: 'custom', content: data, label });
        return this;
    }

    small() {
        this.payloads.push({ name: 'small', content: 'small', label: null });
        return this;
    }

    red() {
        this.payloads.push({ name: 'color', content: 'red', label: null });
        return this;
    }

    table(data: any, label: any) {
        this.payloads.push({ name: 'table', content: data, label });
        return this;
    }
}
