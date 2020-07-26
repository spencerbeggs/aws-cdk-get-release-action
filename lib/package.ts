import { copy, readJson, writeJson } from "fs-extra";

import { resolve } from "path";

const makePath = (str: string): string => resolve(__dirname, str);

async function main(): Promise<void> {
	const pkg = await readJson(resolve(__dirname, "../package.json"));
	delete pkg.devDependencies;
	delete pkg.scripts;
	pkg.main = pkg.main.replace("src/", "").replace(".ts", ".js");
	pkg.types = pkg.main.replace(".js", ".d.ts");
	await writeJson(makePath("../dist/package.json"), pkg, { spaces: "\t" });
	await copy(makePath("../yarn.lock"), makePath("../dist/yarn.lock"));
	await copy(makePath("../src/action.yml"), makePath("../dist/action.yml"));
	await copy(makePath("../README.md"), makePath("../dist/README.md"));
	await copy(makePath("../LICENSE"), makePath("../dist/LICENSE"));
	await copy(makePath("../LICENSE"), makePath("../dist/LICENSE"));
	await copy(makePath("../.dependabot"), makePath("../dist/.dependabot"));
	await copy(makePath("../.github"), makePath("../dist/.github"));
}

main();
