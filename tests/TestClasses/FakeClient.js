import { sep } from 'path';

class Client {
    constructor(portNumber = 23517, host = 'localhost') {
        this.portNumber = portNumber;

        this.host = host;
    }
}

export class FakeClient extends Client {
    sentRequests = [];

    async send(request) {
        const requestProperties = request.toArray();
        const payloads = request.payloads;

        payloads.map(payload => {
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
    async lockExists(lockName) {
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

    convertToUnixPath(path) {
        path = path.replace('D:\\a\\ray\\ray', '');

        return path.replace(sep, '/');
    }
}
