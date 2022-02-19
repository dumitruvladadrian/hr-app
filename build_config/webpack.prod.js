const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
	// Set webpack build mode
	mode: 'production',
	output: {
		filename: '[name].bundle.[chunkhash].js'
	},
	devtool: false,
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	],
	optimization: {
		runtimeChunk: false,
		splitChunks: {
			chunks: 'all'
		},
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
	}
};

module.exports = config;
