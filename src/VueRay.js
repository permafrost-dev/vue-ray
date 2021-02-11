const { Ray } = require('node-ray/web');

class VueRay extends Ray {
    ref(name) {
        if (this.component) {
            this.html(this.component.$refs[name].innerHTML);
        }
    }
}

export default VueRay;
