<<<<<<< HEAD
import { main } from "@src/index";
=======
import { main } from "../../src/main";
>>>>>>> 0.0.1

describe("main()", (): void => {
	it("resolves the string 'Hello, world!", async () => {
		expect(main()).resolves.toBe("Hello, world!");
	});
});
