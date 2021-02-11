const { Ray } = require('node-ray/web');

class VueRay extends Ray {
    data() {
        if (this.component) {
            this.table([this.component.$data]);
        }
    }

    props() {
        if (this.component) {
            this.table([this.component.$props]);
        }
    }

    ref(name) {
        if (this.component) {
            this.html(this.component.$refs[name].innerHTML);
        }
    }
}

export default VueRay;
