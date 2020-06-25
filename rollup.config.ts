import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import * as process from "process";
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const { APP_ENV } = process.env;
export default {
	input: pkg.main.replace("index", APP_ENV === "local" ? "test" : "index"),
	output: [{ dir: "./dist", format: "cjs", sourcemap: true }],
	external: ["dotenv", ...Object.keys(pkg.dependencies || {})],
	watch: {
		include: "src/**",
	},
	plugins: [
		json(),
		typescript({
			// declaration: true,
			// declarationDir: "dist",
		}),
		babel({ extensions, include: ["src/**/*"], babelHelpers: "bundled" }),
		resolve({
			preferBuiltins: true,
		}),
		commonjs(),
		//sourceMaps(),
	],
};
