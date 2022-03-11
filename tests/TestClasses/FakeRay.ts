/* eslint-disable no-unused-vars */

//import { Ray } from 'node-ray';
//import { FakeClient } from './FakeClient';

export class FakeSettings {
    public host = '';
    public port = 0;
    public scheme = 'http';
}

export class FakeRay {
    public payloads: any[] = [];
    public requests: any[] = [];

    // constructor() {
    //     // @ts-ignore
    //     super(new FakeSettings(), new FakeClient(), 'fakeuuid');
    // }

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

    sendRequest(payloads: any | any[], meta: any[] = []) {
        if (!Array.isArray(payloads)) {
            payloads = [payloads];
        }

        this.requests.push({ payloads, meta });

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

    html(html: string | undefined, label = 'HTML') {
        // } data: any, label: any) {
        this.payloads.push({ name: 'custom', content: html, label });
        return this;
    }
}
