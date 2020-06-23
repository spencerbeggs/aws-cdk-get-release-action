/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
	preset: "ts-jest/presets/js-with-ts",
	testEnvironment: "node",
	globals: {
		"ts-jest": {
			packageJson: "package.json",
			tsConfig: "tsconfig.json",
		},
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
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
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
};
