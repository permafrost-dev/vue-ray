const { Ray } = require('node-ray/web');

const RayPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$rayVersion = '__BUILD_VERSION__';

        app.config.globalProperties.$ray = (...args) => {
            return Ray.create().send(...args);
        };

        if (options.interceptErrors === true) {
            app.config.errorHandler = (err, vm) => {
                // pretty-print the error message and stack trace
                const stack = err.stack
                    .replace(
                        /^(\w+):(.+)$/m,
                        '<div class="flex bg-white border-0">' +
                            '<div class="flex-row bg-white text-red-400 pr-1 pl-1 border border-1 border-red-400">$1</div>' +
                            '<div style="padding-top: 0.25em;" class="flex-row">$2</div>' +
                            '</div>'
                    )
                    .replace(/\n/, 'Stack Trace:\n')
                    .replace(
                        / at ([^ ]+) (.*)$/gm,
                        '<div class="inline"> at <span class="text-blue-700">$1</span> $2</div>'
                    );

                vm.$ray().sendCustom(`<pre>${stack}</pre>`, 'Error').small().red();
            };
        }

        app.provide('ray', options);
    },
};

export default RayPlugin;
