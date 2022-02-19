module.exports = {
	roots: [
		'<rootDir>/src'
	],
	testEnvironment: 'jsdom',
	testMatch: [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)'
	],
	transform: {
		'^.+\\.(js|ts|tsx)$': 'babel-jest'
	},
}