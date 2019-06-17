module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [2, 4],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "jsx-a11y/label-has-for": 0,
        "react/no-array-index-key": "off",
        "comma-dangle": ["error", "never"],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
    },
    "parser": "babel-eslint"
};
