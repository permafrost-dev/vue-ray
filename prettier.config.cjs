const overrides = [
    {
        files: ['*.yml', '*.yaml'],
        options: {
            tabWidth: 2,
        },
    },
    {
        files: 'tsconfig.json',
        options: {
            parser: 'json',
        },
    },
    {
        files: '.madgerc',
        options: {
            parser: 'json',
        },
    },
];

module.exports = {
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    jsxSingleQuote: false,
    overrides,
    printWidth: 140,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    requirePragma: false,
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
};
