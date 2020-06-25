import * as core from "@actions/core";
import * as github from "@actions/github";
import { env } from "process";
import console from "dev-console.macro";

const gql = (content: TemplateStringsArray): string => String.raw(content);
export async function main(): Promise<unknown> {
	try {
		const { GITHUB_TOKEN } = env;
		const octokit = github.getOctokit(GITHUB_TOKEN);
		const { graphql } = octokit;
		const result = await graphql(
			gql`
				query {
					repository(owner: "octokit", name: "graphql.js") {
						issues(last: 3) {
							edges {
								node {
									title
								}
							}
						}
					}
				}
			`,
			{
				headers: {
					authorization: GITHUB_TOKEN,
				},
			},
		);
		console.log(result);
		return result;
	} catch (err) {
		core.setFailed(err.message);
		throw err;
	}
}
