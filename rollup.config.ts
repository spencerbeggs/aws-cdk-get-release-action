import babel from "@rollup/plugin-babel";
import builtins from "builtin-modules";
import commonjs from "@rollup/plugin-commonjs";
import { join } from "path";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
export default {
	input: pkg.main,
	output: [{ dir: "./dist", format: "cjs", sourcemap: true }],
	external: [...builtins, ...Object.keys(pkg.dependencies || {})],
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
			rootDir: join(process.cwd(), ".."),
			preferBuiltins: true,
		}),
		commonjs(),
		//sourceMaps(),
	],
};
