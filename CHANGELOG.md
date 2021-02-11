# Changelog

All notable changes to `permafrost-dev/vue-ray` will be documented in this file.

---

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
