<p align="center">
    <img src="https://static.permafrost.dev/images/vue-ray/vue-ray-logo.png" alt="vue-ray" height="200" style="block">
    <br><br>
    <code style="font-size:3.0rem;"><strong>vue-ray</strong></code>
    <br><br>
</p>

<p align="center">
    <img src="https://shields.io/npm/v/vue-ray" alt="npm version"> <img src="https://img.shields.io/npm/dt/vue-ray.svg" alt="npm downloads"> <img src="https://shields.io/github/license/permafrost-dev/vue-ray" alt="license"> <img src="https://github.com/permafrost-dev/vue-ray/workflows/Run%20Tests/badge.svg" alt="test status"> <img src="https://codecov.io/gh/permafrost-dev/vue-ray/branch/main/graph/badge.svg?token=YW2BTKSNEO"/>
</p>

# vue-ray

## Debug your Vue code with Ray to fix problems faster

This package can be installed in any Vue 2.x or Vue 3.x project to send messages to the [Ray app](https://myray.app).

## Installation

Install with npm:

```bash
npm install vue-ray
```

or yarn:

```bash
yarn add vue-ray
```

### Installing in Vue 3

When using in a Vue 3.x project (the default), import the plugin normally:

```js 
import { createApp } from 'vue';
import RayPlugin from 'vue-ray';
import App from './App.vue';

const app = createApp(App);

app.use(RayVuePlugin);
```

### Installing in Vue 2

When using in a Vue 2.x project, import the 'vue2' variant:

```js 
const Vue = require('vue');
const RayPlugin = require('vue-ray/vue2');

Vue.use(RayPlugin);
```

## Usage

Once the plugin is installed, you may access the `ray()` method on `this` as `this.$ray()`.

See the [node-ray reference](https://github.com/permafrost-dev/node-ray#reference) for a full list of available methods.

## Example Component

```vue
<template>
    <div class="flex-col border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto w-100 h-screen">
        <div class="about">
            <h1>This is a folders page</h1>
            <a @click="sendToRay()">send folder to ray</a>
        </div>
        <div class="w-full flex flex-wrap">
            <folder ref="folder1" class="w-4/12 inline-flex"></folder>
            <folder ref="folder2" class="w-4/12 inline-flex"></folder>
        </div>
    </div>
</template>

<script>
import Folder from './Folder.vue';

export default {
    components: {
        Folder
    },
    methods: {
        sendToRay() {
            this.$ray().html(this.$refs.folder1.$el.innerHTML);
        }
    }
};
</script>
```

## Development setup

- `npm install`
- `npm run build:all`
- `npm run test`

## Testing

`vue-ray` uses Jest for unit tests.  To run the test suite:

`npm run test`

---

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Patrick Organ](https://github.com/patinthehat)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
