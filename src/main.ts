import {
	CdkReleaseAssets,
	CdkReleaseAssetsQuery,
	CdkReleaseAssetsQueryVariables,
	CdkReleases,
	CdkReleasesQuery,
	MyReleases,
	MyReleasesQuery,
	MyReleasesQueryVariables,
	Release,
	ReleaseAsset,
} from "./generated/graphql";
import { getInput, setFailed } from "@actions/core";

import { clean } from "semver";
import { client } from "./client";
import { env } from "process";
import { inspect } from "util";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debug(obj: any): void {
	if (env.APP_ENV === "debug") {
		console.log(inspect(obj, false, 7, true));
	}
}

async function getCdkReleasesAssets(tagName: string): Promise<ReleaseAsset[]> {
	const version = clean(tagName);
	const result = await client.query<CdkReleaseAssetsQuery, CdkReleaseAssetsQueryVariables>({
		query: CdkReleaseAssets,
		variables: {
			tagName,
		},
	});
	const assets = result.data.repository.release.releaseAssets.edges.map((edge) => edge.node as ReleaseAsset);
	const downloadUrl = assets.reduce((acc, asset) => {
		if (asset.name === `asw-cdk-${version}.zip`) {
			acc = asset.url;
		}
		return acc;
	}, null);
	return result.data.repository.release.releaseAssets.edges.map((edge) => edge.node as ReleaseAsset);
}

async function getCdkReleases(): Promise<Release[]> {
	const result = await client.query<CdkReleasesQuery>({
		query: CdkReleases,
	});
	return result.data.repository.releases.edges.map((edge) => edge.node as Release);
}

async function getMyReleases(): Promise<Release[]> {
	const [owner, name] = env.GITHUB_REPOSITORY.split("/");
	const result = await client.query<MyReleasesQuery, MyReleasesQueryVariables>({
		query: MyReleases,
		variables: {
			owner,
			name,
		},
	});
	return result.data.repository.releases.edges.map((edge) => edge.node as Release);
}

export async function main(): Promise<unknown> {
	try {
		const tagName = env.CDK_RELEASE_TAG ?? getInput("tag");
		const asset = await getCdkReleasesAssets(tagName);
		debug(asset);
		const mine = await getMyReleases();
		debug(mine);
		const result = await getCdkReleases();
		debug(result);
		return result;
	} catch (err) {
		setFailed(err.message);
		throw err;
	}
}
