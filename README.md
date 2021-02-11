<p align="center">
    <img src="https://static.permafrost.dev/images/vue-ray/vue-ray-logo.png" alt="vue-ray" height="200" style="block">
    <br><br>
    <code style="font-size:3.0rem;"><strong>vue-ray</strong></code>
    <br><br>
</p>

<p align="center">
    <img src="https://shields.io/npm/v/vue-ray" alt="npm version"> <img src="https://shields.io/npm/dt/vue-ray" alt="npm downloads"> <img src="https://shields.io/github/license/permafrost-dev/vue-ray" alt="license"> <img src="https://github.com/permafrost-dev/vue-ray/workflows/Run%20Tests/badge.svg?branch=main" alt="test status"> <img src="https://codecov.io/gh/permafrost-dev/vue-ray/branch/main/graph/badge.svg?token=YW2BTKSNEO"/>
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

When using in a Vue 3.x project (the default), import the 'vue3' variant:

```js 
import { createApp } from 'vue';
import App from './App.vue';

// as an es module import:
import RayPlugin from 'vue-ray/vue3';

// or as a commonjs import:
const { RayPlugin } = require('vue-ray/vue3');

const app = createApp(App);

app.use(RayPlugin, { interceptErrors: true });
```

### Installing in Vue 2

When using in a Vue 2.x project, import the 'vue2' variant:

```js 
const Vue = require('vue');

// as an es module import:
import RayPlugin from 'vue-ray/vue2';

// or as a commonjs import:
const { RayPlugin } = require('vue-ray/vue2');

Vue.use(RayPlugin, { interceptErrors: true });
```

### Installation options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `interceptErrors` | `boolean` | `false` | send Vue errors to Ray |

## Usage

Once the plugin is installed, you may access the `ray()` method on `this` as `this.$ray()`.

See the [node-ray reference](https://github.com/permafrost-dev/node-ray#reference) for a full list of available methods.

## Vue-specific methods

| Name | Description |
| --- | --- |
| `data()` | show the component data |
| `props()` | show the component props |
| `ref(name)` | show the `innerHTML` of a named ref |

## Example Component

```vue
<template>
    <div class="flex-col border-r border-gray-200 bg-white overflow-y-auto w-100">
        <div class="about">
            <h1>This is a folders page</h1>
            <a @click="sendToRay()">send folder to ray</a>
        </div>
        <div ref="div1" class="w-full flex flex-wrap">
            <div ref="div1a" class="w-4/12 inline-flex">one</div>
            <div ref="div1b" class="w-4/12 inline-flex">two</divr>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        sendToRay() {
            this.$ray().ref('div1');
        }
    }
};
</script>
```

## Intercepting errors (Vue 3)

Use the `interceptErrors` option to intercept errors and send them to Ray:

```js
app.use(RayPlugin, { interceptErrors: true });
```

## Intercepting errors (Vue 2)

Use the `interceptErrors` option to intercept errors and send them to Ray:

```js
Vue.use(RayPlugin, { interceptErrors: true });
```

## Development setup

- `npm install`
- `npm run test`
- `npm run build:all`

## Testing

`vue-ray` uses Jest for unit tests.  To run the test suite:

`npm run test`

---

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Patrick Organ](https://github.com/patinthehat)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
