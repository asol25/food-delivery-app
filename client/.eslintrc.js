module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-empty-interface': 'off',
		indent: ['error', 'tab'],
		'linebreak-style': ['off', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
};
