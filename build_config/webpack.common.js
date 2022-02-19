const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonPaths = require('./common');

const config = {
	entry: [`${commonPaths.src}/index`],
	output: {
		path: commonPaths.outputPath,
		publicPath: '/'
	},
	resolve: {
		modules: [
			commonPaths.nodeModules,
			commonPaths.src,
			commonPaths.public,
		],
		extensions: ['.js', '.json', '.jsx', '.svg', '.png', '.ts', '.tsx'],
		alias: {
			src: commonPaths.src,
		}
	},
	target: 'web',
	module: {
		rules: [
			// Loader for ts and tsx files
			{
				test: /\.tsx?$/,
				exclude: /\.test.tsx$/,
				use: [
					'babel-loader'
				]
			},
			// Loader for js and jsx files
			{
				test: /\.jsx?$/,
				use: ['babel-loader']
			},
			// use asset modules to load the needed files
			{
				test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)/,
				type: 'asset',
			},
		]
	},
	plugins: [
		// Generate index.html file with dynamic assets
		new HtmlWebpackPlugin({
			hash: false,
			filename: 'index.html',
			template: `${commonPaths.public}/index.tmpl.html`,
			inject: 'head',
			minify: {removeComments: true, collapseWhitespace: true, minifyJS: true},
			productName: 'Play on !',
			favicon: `${commonPaths.public}/favicon.ico`,
		})
	]
};

module.exports = config;
