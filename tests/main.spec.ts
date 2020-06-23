import { main, babel } from "@src/index";

describe("main()", (): void => {
	it("resolves the string 'Hello, world!", async () => {
		expect(main()).resolves.toBe("Hello, world!");
	});
});

describe("babel", (): void => {
	it("optional chaining works", () => {
		expect(babel.optional.foo).toBe("bar");
		expect(babel.optional?.mar?.maz).toBe(undefined);
	});
	it("nullish coalescing works", () => {
		expect(babel.nullishCheck("foobar")).toBe("foobar");
		expect(babel.nullishCheck()).toBe("nullish");
	});
});
