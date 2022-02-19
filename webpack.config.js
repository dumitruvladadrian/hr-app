const {merge} = require('webpack-merge');

// Get common Webpack config for all environments
const commonConfig = require('./build_config/webpack.common');

// Merge additional webpack config for different environments i.e. dev and prod
module.exports = env => {
	const envConfig = require(`./build_config/webpack.${env.mode}.js`); //eslint-disable-line
	return merge(commonConfig, envConfig);
};
