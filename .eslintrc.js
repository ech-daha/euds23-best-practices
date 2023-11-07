module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-import",
        "eslint-plugin-jsdoc",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/require-await": "off",
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
    }
};
