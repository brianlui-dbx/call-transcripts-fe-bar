//#region server/coaching/http.ts
/**
* Validates `data` against `schema`. On failure it writes a 400 with the first
* validation message and returns `null`, so handlers can `if (!input) return;`.
*/
function parseOr400(schema, data, res) {
	const result = schema.safeParse(data);
	if (result.success) return result.data;
	res.status(400).json({ error: result.error.issues[0]?.message ?? "invalid request" });
	return null;
}
/** Logs the cause server-side and returns a generic message to the caller. */
function fail(res, message, err) {
	console.error(`[coaching] ${message}`, err);
	res.status(500).json({ error: message });
}
/** TIMESTAMPTZ columns arrive as `Date`; the API always speaks ISO strings. */
function iso(value) {
	if (value === null) return null;
	return value instanceof Date ? value.toISOString() : value;
}

//#endregion
export { fail, iso, parseOr400 };