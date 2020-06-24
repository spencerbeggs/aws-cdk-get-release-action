import { main } from "../src/main";

describe("main()", (): void => {
	it("resolves the string 'Hello, world!", async () => {
		const promise = main();
		expect(promise).resolves.toBe(undefined);
	});
});
