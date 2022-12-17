module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
		"plugin:import/typescript", // this is needed because airbnb uses eslint-plugin-import
		"prettier",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
	},
	plugins: ["react", "@typescript-eslint", "react-hooks"],
	rules: {
		"jsx-a11y/click-events-have-key-events": "off",
		"jsx-a11y/no-static-element-interactions": "off",
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"import/no-unresolved": [
			2,
			{
				caseSensitive: false,
			},
		],
		"@typescript-eslint/no-empty-interface": "off",
		"linebreak-style": ["off", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-new": 0,
		"no-alert": 0,
		"no-shadow": 0,
		"no-console": 0,
		"react/jsx-key": 1,
		"import/no-cycle": 0,
		"arrow-body-style": 1,
		"react/prop-types": 1,
		"no-param-reassign": 0,
		"no-nested-ternary": 0,
		"default-param-last": 0,
		"no-use-before-define": 0,
		"no-underscore-dangle": 0,
		"no-extra-boolean-cast": 1,
		"react/button-has-type": 1,
		"no-restricted-exports": 0,
		"react/no-children-prop": 0,
		"react/forbid-prop-types": 0,
		"import/no-named-as-default": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"react/react-in-jsx-scope": 0,
		"react/no-array-index-key": 0,
		"react/no-unused-prop-types": 1,
		"no-promise-executor-return": 0,
		"no-unsafe-optional-chaining": 0,
		"react/require-default-props": 0,
		"react/no-unescaped-entities": 0,
		"import/prefer-default-export": 0,
		"react/jsx-props-no-spreading": 0,
		"react/jsx-filename-extension": 0,
		"react/jsx-no-duplicate-props": 0,
		"react/jsx-no-useless-fragment": 0,
		"react/jsx-curly-brace-presence": 0,
		"react/destructuring-assignment": 0,
		"import/no-extraneous-dependencies": 0,
		"react/no-unstable-nested-components": 0,
		"react/function-component-definition": 0,
		"react/jsx-no-constructed-context-values": 0,
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
		"react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

		"no-unused-vars": [
			1,
			{
				ignoreRestSiblings: false,
			},
		],
		"prefer-destructuring": [
			1,
			{
				object: true,
				array: false,
			},
		],
	},
};
