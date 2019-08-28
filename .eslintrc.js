module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['airbnb'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        // 'comma-dangle': 0
        semi: 0,
        'react/require-default-props': 0,
        'react/destructuring-assignment': 0,
    },
}
