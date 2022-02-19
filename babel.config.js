module.exports = {
	presets: [
		'@babel/preset-react',
		'@babel/preset-typescript',
		[
			'@babel/preset-env',
			{
				// loads polyfills from @babel/polyfill for the targeted browsers
				useBuiltIns: 'entry',
				corejs: 3.15,
				targets: {
					browsers: ['chrome >= 55', 'firefox >= 52', 'safari >= 11', 'edge >= 13']
				}
			}
		]
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-transform-runtime'
	],
	env: {
		development: {},
		test: {
			presets: [
				['@babel/preset-env', {targets: {node: 'current'}}],
				'@babel/preset-typescript'
			],
			plugins: [
				['babel-plugin-webpack-alias-7', {config: './build_config/webpack.common.js'}],
				'@babel/plugin-proposal-optional-chaining'
			]
		},
		production: {
			plugins: ['transform-react-remove-prop-types']
		}
	}
};
