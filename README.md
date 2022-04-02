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

## Debug Vue code with Ray to fix problems faster

Install this package in any Vue 2 or Vue 3 project to send messages to the [Ray app](https://myray.app). It also includes a Vuex plugin to monitor changes to the Vuex state.

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

When using in a Vue 3.x project (the default), import the package:

```js
import { createApp } from 'vue';
import App from './App.vue';

// as an es module import:
import { RayPlugin } from 'vue-ray';

// or as a commonjs import:
const { RayPlugin } = require('vue-ray');

const app = createApp(App);

app.use(RayPlugin, { 
    interceptErrors: true,
    port: 23500,
    showComponentEvents: ['created', 'mounted'],
    nodeRaySettings: { 
        interceptConsoleLog: true,
    },
});
```

### Installing in Vue 2

When using in a Vue 2.x project, import the 'vue2' variant:

```js
const Vue = require('vue');

// as an es module import:
import { RayPlugin } from 'vue-ray/vue2';

// or as a commonjs import:
const { RayPlugin } = require('vue-ray/vue2');

Vue.use(RayPlugin, { 
    interceptErrors: true,
    host: '127.0.0.1',
    showComponentEvents: ['mounted'],
    nodeRaySettings: {
        interceptConsoleLog: false,
    },
});
```

### Installation options

| Name                  | Type       | Default     | Description                                                    |
| --------------------- | ---------- | ----------- | -------------------------------------------------------------- |
| `host`                | `string`   | `localhost` | host to connect to the Ray app on                              |
| `scheme`              | `string`   | `http`      | URI scheme to use to connect to host                           |
| `interceptErrors`     | `boolean`  | `false`     | send Vue errors to Ray                                         |
| `port`                | `number`   | `23517`     | port to connect to the Ray app on                              |
| `showComponentEvents` | `string[]` | `[]`        | display component events in Ray, see below for possible values |
| `nodeRaySettings`     | `object`   | `{}`        | pass additional settings for `node-ray` _[(reference)](https://github.com/permafrost-dev/node-ray#configuration)_ |

### Component events

Component lifecycle events can be sent to Ray using the `showComponentEvents` plugin option _(`array`)_.

Use any of the following values with this option:

- `before-create`
- `before-mount`
- `created`
- `mounted`
- `unmounted`
- `updated`

## Usage

Once the plugin is installed, you may access the `ray()` method on `this` as `this.$ray()`.

See the [node-ray reference](https://github.com/permafrost-dev/node-ray#reference) for a complete list of available methods.

## Vue-specific methods

| Name                        | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| `this.$ray().data()`        | show the component data                                |
| `this.$ray().props()`       | show the component props                               |
| `this.$ray().ref(name)`     | show the `innerHTML` of a named ref                    |
| `this.$ray().track(name)`   | display changes to a component's data variable         |
| `this.$ray().untrack(name)` | stop displaying changes to a component's data variable |

## Tracking component data

Changes to any component's data variables can be tracked and displayed in real-time using the `track(name)` method.

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
        setInterval(() => {
            this.one += 3;
        }, 4000);
    },
};
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

## Using the Vuex plugin

In either a Vue 2.x or 3.x project, use the `vue-ray` vuex plugin - it can track the vuex state, log mutations, and log actions.

To use it, import the `RayVuexPlugin` function from `vue-ray`, and pass the result of the function to the `plugins` property on your Vuex store:

```js
// ...

import { RayVuexPlugin } from 'vue-ray'; // for both vue 2 and vue 3

// ...

const storeObj = {
    state: {
        one: 11,
        two: 22,
    },
    mutations: {
        incrementOne(state) {
            state.one += 1;
        },
        incrementTwo(state) {
            state.two += 2;
        },
    },
    actions: {},
    modules: {},
    plugins: [
        RayVuexPlugin({ 
            trackState: true,
            logMutations: true,
            trackingOptions: {
                propNames: ['on*'],
            }
        }),
    ],
};

// Vue 3:
export default createStore(storeObj);

// Vue 2:
export default new Vuex.Store(storeObj);
```

### Vuex plugin options

| Name                  | Type      | Description                                        |
| --------------------- | --------- | -------------------------------------------------- |
| `trackState`          | `boolean` | track the data in the store's state                |
| `logMutations`        | `boolean` | log all fired mutations to Ray                     |
| `logActions`          | `boolean` | log all fired actions to Ray                       |
| `loggedMutationColor` | `string`  | send logged mutations with the specified Ray color |
| `loggedActionColor`   | `string`  | send logged actions with the specified Ray color   |
| `trackingOptions`     | `object`  | see "tracking options" section for more info       |

Valid color names are `blue`, `gray`, `green`, `orange`, `purple`, `red`, and `none`.

### Tracking options

The `trackingOptions` definition is as follows:

```typescript
trackingOptions?: {
    moduleNames?: string[];
    propNames?: string[];
};
```

The `propNames` is an array of wildcard patterns that will match stored data property names when tracking store state; for example, a value of `['f*']` would match store data properties named `foo` and `fab` but not `dog`.

The `moduleNames` is also an array of wildcard patterns but will match module names and module data property names, such as `['mymod.*']`, which would match all properties in the `mymod` store.

The default value is `['*']`, meaning all modules and properties match.


## Development setup

- `npm install`
- `npm run test`
- `npm run build:all`

## Code Coverage Details

<p align="center">
    <img src="https://codecov.io/gh/permafrost-dev/vue-ray/branch/main/graphs/commits.svg" height="100" alt="codecov graph" />
    <br>
    <img src="https://codecov.io/gh/permafrost-dev/vue-ray/branch/main/graphs/sunburst.svg" height="210" alt="codecov graph" />
</p>

## Testing

`vue-ray` uses Jest for unit tests. To run the test suite:

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
