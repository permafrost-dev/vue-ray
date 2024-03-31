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

Install this package in any Vue 3 project to send messages to the [Ray app](https://myray.app).

## Installation

Install with npm:

```bash
npm install vue-ray
```

or bun:

```bash
bun add vue-ray
```

### Installing

When using in a Vue 3 project, import the package:

```js
import { RayPlugin } from 'vue-ray';
import { createApp } from 'vue';
import App from './App.vue';

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

To access the `ray()` function import `raySetup` from the `vue-ray` library:

```vue
<script setup>
import { raySetup } from 'vue-ray'
const ray = raySetup();
</script>
```

Then use the `ray` function in the Vue SFC as normal _(see node-ray)_ to send data to Ray:

```vue
<template>
    <div>
        <button @click="ray('Hello from Vue!')">Send message to Ray</button>
        <button @click="() => ray().html('<strong>hello with html!</strong>')">Send html message to Ray</button>
    </div>
</template>
```

See the [node-ray reference](https://github.com/permafrost-dev/node-ray#reference) for a complete list of available methods.

## Vue-specific methods

| Name                        | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| `$ray.data()`        | show the component data                                |
| `$ray.props()`       | show the component props                               |
| `$ray.ref(name)`     | show the `innerHTML` of a named ref                    |
| `$ray.track(name)`   | display changes to a component's data variable         |
| `$ray.untrack(name)` | stop displaying changes to a component's data variable |

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

## Intercepting errors

Use the `interceptErrors` option to intercept errors and send them to Ray:

```js
app.use(RayPlugin, { interceptErrors: true });
```

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

```bash
npm install
npm run test
```

## Development Builds

```bash
npm run build:dev
```

This will build the package in development mode, and writes to the `dist-temp` directory.

## Production Builds

```bash
npm run build:dist
```

This will build the package in production mode, and writes to the `dist` directory.

## Code Coverage Details

<p align="center">
    <img src="https://codecov.io/gh/permafrost-dev/vue-ray/branch/main/graphs/commits.svg" height="100" alt="codecov graph" />
    <br>
    <img src="https://codecov.io/gh/permafrost-dev/vue-ray/branch/main/graphs/sunburst.svg" height="210" alt="codecov graph" />
</p>

## Testing

`vue-ray` uses Vitest for unit tests. To run the test suite, run the following command:

```bash
npm run test
```

...or run with coverage:

```bash
npm run test:coverage
```

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
