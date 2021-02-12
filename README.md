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

When using in a Vue 3.x project (the default), import package normally:

```js 
import { createApp } from 'vue';
import App from './App.vue';

// as an es module import:
import RayPlugin from 'vue-ray';

// or as a commonjs import:
const { RayPlugin } = require('vue-ray');

const app = createApp(App);

app.use(RayPlugin, { interceptErrors: true, host: '127.0.0.1', port: 23500, showComponentEvents: ['created', 'mounted'] });
```

### Installing in Vue 2

When using in a Vue 2.x project, import the 'vue2' variant:

```js 
const Vue = require('vue');

// as an es module import:
import RayPlugin from 'vue-ray/vue2';

// or as a commonjs import:
const { RayPlugin } = require('vue-ray/vue2');

Vue.use(RayPlugin, { interceptErrors: true, host: '127.0.0.1', port: 23500, showComponentEvents: ['mounted'] });
```

### Installation options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `host` | `string` | `localhost` | host to connect to the Ray app on |
| `interceptErrors` | `boolean` | `false` | send Vue errors to Ray |
| `port` | `number` | `23517` | port to connect to the Ray app on |
| `showComponentEvents` | `string[]` | `[]` | display component events in Ray, can be any of `created, mounted`

## Usage

Once the plugin is installed, you may access the `ray()` method on `this` as `this.$ray()`.

See the [node-ray reference](https://github.com/permafrost-dev/node-ray#reference) for a full list of available methods.

## Vue-specific methods

| Name | Description |
| --- | --- |
| `this.$ray().data()` | show the component data |
| `this.$ray().props()` | show the component props |
| `this.$ray().ref(name)` | show the `innerHTML` of a named ref |
| `this.$ray().track(name)` | display changes to a component's data variable |
| `this.$ray().untrack(name)` | stop displaying changes to a component's data variable |

## Tracking component data

Changes to any of a component's data variables can be tracked and displayed in real time using the `track(name)` method.

```vue
<script>
export default {
    props: ['title'],
    data() {
        return {
            one: 100,
            two: 22,
        };
    },
    created() {
        this.$ray().data();
        this.$ray().track('one');
    },
    mounted() {
        setInterval( () => { this.one += 3; }, 4000);
    }
}
</script>
```

## Example Component

```vue
<template>
    <div class="flex-col border-r border-gray-200 bg-white overflow-y-auto w-100">
        <div class="about">
            <h1>{{ title }}</h1>
            <a @click="sendToRay()">send ref to ray</a><br>
            <a @click="increment()">increment data var</a><br>
        </div>
        <div ref="div1" class="w-full flex flex-wrap">
            <div ref="div1a" class="w-4/12 inline-flex">{{ one }}</div>
            <div ref="div1b" class="w-4/12 inline-flex">{{ two }}</divr>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {
            one: 100,
            two: 22,
        };
    },
    created() {
        this.$ray().data();
        this.$ray().track('one');
    },
    methods: {
        sendToRay() {
            this.$ray().ref('div1');
        },
        increment() {
            this.one += 3;
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
