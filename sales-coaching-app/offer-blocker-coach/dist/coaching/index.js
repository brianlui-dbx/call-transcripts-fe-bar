import { actorFrom } from "./db.js";
import { registerCaseRoutes } from "./case-routes.js";
import { registerRosterRoutes } from "./roster-routes.js";
import { registerSummaryRoutes } from "./summary-routes.js";
import { initCoachingSchema } from "./schema.js";

//#region server/coaching/index.ts
async function setupCoaching(appkit) {
	const db = appkit.lakebase;
	try {
		await initCoachingSchema(db);
	} catch (err) {
		console.error("[coaching] schema init failed; coaching routes will return errors:", err);
	}
	appkit.server.extend((app) => {
		/**
		* Identity of the signed-in manager, used for the header badge and to
		* disclose how each half of the app executes.
		*/
		app.get("/api/whoami", (req, res) => {
			res.json({
				email: req.header("x-forwarded-email") ?? null,
				user: req.header("x-forwarded-user") ?? null,
				actor: actorFrom(req),
				genieExecution: "on_behalf_of_user",
				lakebaseExecution: "service_principal"
			});
		});
		registerSummaryRoutes(app, db);
		registerRosterRoutes(app, db);
		registerCaseRoutes(app, db);
	});
}

//#endregion
export { setupCoaching };