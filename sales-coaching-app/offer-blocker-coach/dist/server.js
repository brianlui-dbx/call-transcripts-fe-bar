import { setupCoaching } from "./coaching/index.js";
import { createApp, genie, lakebase, server } from "@databricks/appkit";

//#region server/server.ts
/**
* The alias the frontend asks through. It maps to the existing
* "Offer Blocker Analytics" Genie agent, which this repo's setup job
* provisions from `superior-offer-blocker/genie/genie_agent.json`.
*/
const GENIE_ALIAS = "offerBlockers";
const genieSpaceId = process.env.DATABRICKS_GENIE_SPACE_ID;
if (!genieSpaceId) console.error("[genie] DATABRICKS_GENIE_SPACE_ID is not set — the Ask Genie page will fail. It is injected from the genie-space app resource (app.yaml) in production, and from .env locally.");
createApp({
	plugins: [
		genie({ spaces: { [GENIE_ALIAS]: genieSpaceId ?? "" } }),
		lakebase(),
		server()
	],
	async onPluginsReady(appkit) {
		await setupCoaching(appkit);
	}
}).catch(console.error);

//#endregion
export { GENIE_ALIAS };