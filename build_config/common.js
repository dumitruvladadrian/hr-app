const path = require('path');

// Common paths for Webpack builds
module.exports = {
	outputPath: path.resolve(__dirname, '../', 'dist'),
	nodeModules: path.resolve(__dirname, '../', 'node_modules'),
	src: path.resolve(__dirname, '../', 'src'),
	public: path.resolve(__dirname, '../', 'public'),
	tsconfig: path.join(__dirname, '../', 'tsconfig.json')
};
