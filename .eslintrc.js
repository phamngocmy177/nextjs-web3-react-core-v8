module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@next/next/recommended",
		"react-app",
		"google",
		"prettier",
	],
	env: {
		es6: true,
		browser: true,
		jest: true,
		node: true,
	},
	settings: { react: { version: "detect" } },
	rules: {
		"@typescript-eslint/no-unused-vars": [2, { argsIgnorePattern: "^_" }],
	},
};
