# Changelog

All notable changes to `permafrost-dev/vue-ray` will be documented in this file.

---

## 1.16.0 - 2021-04-02

- refactor error handlers code
- allow specifying a closure as a value of the `interceptErrors` option which returns data to display along with the error message
- add `enabled_callback`, `sending_payload_callback` and `sent_payload_callback` options which are passed to [`node-ray`](https://github.com/permafrost-dev/node-ray)

## 1.15.0 - 2021-03-12

- try to determine the correct component name when displaying component events

## 1.14.0 - 2021-03-12

- don't display events for "unknown" components

- fix an issue with Vue 3 plugin throwing an error during event interception

## 1.13.5 - 2021-03-12

- remove debug code

## 1.13.4 - 2021-03-12

- fix an issue with Vue 2 plugin throwing an error during event interception

## 1.13.3 - 2021-03-11

- change `node-ray/web` to an `import` instead of a `require()`

## 1.13.2 - 2021-03-11

- remove multimatch package and use custom pattern matching instead, fixes webpack 'path' bug

## 1.13.1 - 2021-03-11

- make minimatch and path libraries external in rollup configurations

## 1.13.0 - 2021-03-11

- added support for intercepting all lifecycle events to Vue 2 plugin

- added increased test coverage for Vue 2 and Vue 3 mixins

## 1.12.0 - 2021-03-10

- all exports are "named" exports now

- all errors, including window errors and unhandled rejection errors, are also sent to Ray

- added Vuex plugin `trackingOptions.propNames: string[]` that supports wildcard matching of store property names to display when tracking store data

- readme updates and examples

## 1.11.0 - 2021-03-10

- allow specifying the `scheme` option when installing the Vue plugin _(http or https)_

## 1.10.0 - 2021-03-02

- update vuex plugin to support tracking state, logging mutations and logging actions

## 1.9.0 - 2021-03-02

- add support for lifecycle events `beforeCreate`, `beforeMount`, `updated`

- bump package versions: `concurrently` to `6.0.0`, `eslint-config-prettier` to `8.1.0`

- add Vuex plugin to allow monitoring of the Vuex state/mutations

## 1.8.0 - 2021-02-12

- fix recursive error with calls to `data()` in Vue 2

- convert entire project to TypeScript

- add lifecycle event logging, configured with plugin option `showComponentEvents: ['created', 'mounted']`

## 1.7.1 - 2021-02-11

- fix data var tracking call to `watch()`

## 1.7.0 - 2021-02-11

- component data change tracking shows changes in real time with `this.$ray().track('myvar')`

- added additional unit tests

- reorganized code

- moved duplicate code to shared modules

## 1.6.1 - 2021-02-11

- allow specifying the host to connect to as `options.host`

- allow specifying the port to connect to as `options.port`

## 1.6.0 - 2021-02-11

- add `this.$ray().data()` to show component data

- add `this.$ray().props()` to show component props

- add `this.$ray().ref(name)` method that shows the html content of a named Vue ref

- merge duplicate code into shared files

- reorganize project structure

- update readme examples

## 1.5.1 - 2021-02-11

- fix rollup-removed error handlers being removed

- change error handler to pretty-print errors plus stack trace


## 1.5.0 - 2021-02-10

- add `interceptErrors` option - if true, display Vue errors in Ray instead of the console

## 1.4.2 - 2021-02-09

- convert all tests to es6

- clean up and standardize rollup configs

- remove unused packages

- remove rollup configs from npm package

- `this.$rayVersion` returns the current `vue-ray` package version

## 1.4.1 - 2021-02-09

- fix `/vue2` export

- fix `/vue3` export

## 1.4.0 - 2021-02-09

- change vue2/vue3 to use module.exports

- code cleanup

- use `Ray.create().send(...)` instead of `ray(...)` in Vue 3 plugin

## 1.3.0 - 2021-02-09

- update the way vue2 & vue3 modules are imported

- update readme

## 1.2.0 - 2021-02-08

- change the format and naming of vue2 plugin files

## 1.1.0 - 2021-02-08

- use node-ray commonjs exports in plugins

- update readme

## 1.0.0 - 2021-02-08

- initial release
