export class FakeVm {
    public ray: any;

    constructor(ray: any) {
        this.ray = ray;
    }

    $ray(...args: any[]) {
        return this.ray.send(...args);
    }
}
