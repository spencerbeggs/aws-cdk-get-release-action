import * as core from "@actions/core";
import * as github from "@actions/github";
import * as process from "process";

const gql = (content: TemplateStringsArray): string => String.raw(content);
export async function main(): Promise<void> {
	try {
		const { GITHUB_TOKEN } = process.env;
		console.log(GITHUB_TOKEN);
		const token = GITHUB_TOKEN ?? core.getInput("token");
		const octokit = github.getOctokit(token);
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
			{},
		);
		console.log(result);
	} catch (err) {
		console.log(err);
		core.setFailed(err.message);
		throw err;
	}
}
