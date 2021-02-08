
export interface RayVueOptions {
    enable: boolean;
    host: string;
    port: number;
}

export function mergeOptionsWithDefaults(options: RayVueOptions): RayVueOptions {
    return <RayVueOptions>Object.assign({ enable: true, host: 'localhost', port: 23517 }, options);
}
