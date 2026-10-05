//#region server/coaching/db.ts
/**
* The signed-in manager, from the identity headers Databricks Apps injects.
*
* Recorded as the author/actor on everything written to Lakebase so coaching
* history is attributable even though the writes themselves run as the app's
* service principal.
*/
function actorFrom(req) {
	return req.header("x-forwarded-email") ?? req.header("x-forwarded-user") ?? null;
}
/** Parses a positive integer route parameter, or `null` when it is not one. */
function parseId(raw) {
	if (!raw) return null;
	const id = Number(raw);
	return Number.isInteger(id) && id > 0 ? id : null;
}
/**
* Builds the `SET` clause of an UPDATE from a column → value map, skipping keys
* the caller did not supply. Column names are literals from the route module,
* never user input; values are always bound as parameters.
*/
function buildUpdate(columns, firstParamIndex = 1) {
	const assignments = [];
	const values = [];
	for (const [column, value] of Object.entries(columns)) {
		if (value === void 0) continue;
		values.push(value);
		assignments.push(`${column} = $${firstParamIndex + values.length - 1}`);
	}
	return {
		clause: assignments.join(", "),
		values
	};
}
/** Records an entry in the per-case audit trail. Never throws into a request. */
async function recordEvent(db, schema, caseId, actor, eventType, detail = {}) {
	try {
		await db.query(`INSERT INTO ${schema}.case_events (case_id, actor, event_type, detail)
       VALUES ($1, $2, $3, $4::jsonb)`, [
			caseId,
			actor,
			eventType,
			JSON.stringify(detail)
		]);
	} catch (err) {
		console.error("[coaching] failed to record case event", eventType, err);
	}
}

//#endregion
export { actorFrom, buildUpdate, parseId, recordEvent };