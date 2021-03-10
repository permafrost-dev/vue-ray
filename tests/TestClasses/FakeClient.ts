import { sep } from 'path';

class Client {
    public portNumber: number;
    public host: string;

    constructor(portNumber = 23517, host = 'localhost') {
        this.portNumber = portNumber;

        this.host = host;
    }
}

export class FakeClient extends Client {
    public sentRequests: any[] = [];

    async send(request: any) {
        const requestProperties: any = request.toArray();
        const payloads = request.payloads;

        payloads.map((payload: any) => {
            payload.toArray();

            const fn = payload.data.origin.file ?? '/test/file.js';

            payload.data.origin.function_name = 'xxxx';
            payload.data.origin.line_number = 999;
            payload.data.origin.file = fn
                .replace(this.baseDirectory(), '')
                .replace('/node_modules', '')
                .replace('/node-ray', '')
                .replace('/dist', '')
                .replace(/^\//, '');

            payload.data.origin.file = 'web.cjs.js';

            if (payload.getType() === 'measure') {
                payload.data.content.total_time = Math.floor(payload.data.content.total_time / 10);
                payload.data.content.time_since_last_call = Math.floor(payload.data.content.time_since_last_call / 10);
            }

            if (payload.getType() === 'create_lock') {
                payload.data.content.name = 'xxxxx';
            }
        });

        requestProperties.meta = [];

        this.sentRequests.push(requestProperties);
    }

    // eslint-disable-next-line no-unused-vars
    async lockExists(lockName: any) {
        return new Promise(resolve => {
            resolve({ active: false, stop_exectution: true });
        });
    }

    sentPayloads() {
        return this.sentRequests;
    }

    reset() {
        this.sentRequests = [];

        return this;
    }

    baseDirectory() {
        return __dirname.replace('/tests/TestClasses', '');
    }

    convertToUnixPath(path: string) {
        path = path.replace('D:\\a\\ray\\ray', '');

        return path.replace(sep, '/');
    }
}
