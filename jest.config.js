/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");
const babelConfig = require("./babel.config.json");

module.exports = {
	preset: "ts-jest/presets/js-with-ts",
	testEnvironment: "node",
	globals: {
		"ts-jest": {
			packageJson: "package.json",
			tsConfig: "tsconfig.json",
			babelConfig: babelConfig,
		},
	},
	setupFiles: ["./jest.env.js"],
	transform: {
		"^.+\\.tsx?$": "babel-jest",
	},
	moduleDirectories: ["node_modules"],
	testMatch: null,
	testRegex: "(/(tests|src|lib)/.*(.(test|spec)).(j|t)sx?)$",
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.yarn/", "<rootDir>/.cache/", "<rootDir>/dist/"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	coverageReporters: ["text"],
	maxConcurrency: 10,
	cacheDirectory: ".cache/jest",
	roots: ["<rootDir>/src/", "<rootDir>/tests/"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
};
