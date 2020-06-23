export async function main(): Promise<string> {
	return "Hello, world!";
}
interface BabelTest {
	optional: {
		foo: string;
		mar?: {
			maz?: string;
		};
	};
	nullishCheck: (val?: string) => string;
}
export const babel: BabelTest = {
	optional: {
		foo: "bar",
	},
	nullishCheck: (val) => val ?? "nullish",
};
