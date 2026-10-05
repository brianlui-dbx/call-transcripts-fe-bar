import { z } from "zod";

//#region server/coaching/domain.ts
/**
* Domain contract for the sales-manager coaching workflow.
*
* Genie ("Offer Blocker Analytics") supplies the analytical finding; everything a
* manager *decides* about that finding — assignment, status, coaching notes,
* agreed actions — is operational state that lives in Lakebase.
*/
/** Schema the app's service principal owns in Lakebase. */
const SCHEMA = "sales_coaching";
const CASE_STATUSES = [
	"open",
	"in_coaching",
	"resolved",
	"dismissed"
];
const CASE_PRIORITIES = [
	"high",
	"medium",
	"low"
];
const CASE_SOURCES = ["genie", "manual"];
/** Dispositions the upstream pipeline treats as a real blocker rather than context. */
const BLOCKING_DISPOSITIONS = ["hard_blocker", "friction"];
const trimmed = (max) => z.string().trim().max(max);
/**
* A required free-text field. The `error` option covers the missing/wrong-type
* case too, so an omitted field reports "title is required" rather than Zod's
* default "expected string, received undefined".
*/
const requiredText = (max, message) => z.string({ error: message }).trim().min(1, message).max(max);
const optionalText = (max) => trimmed(max).nullish().transform((v) => v ? v : null);
/** `YYYY-MM-DD`; kept as a string so a DATE column round-trips without timezone drift. */
const dayString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");
const isoDate = dayString.nullish().transform((v) => v ? v : null);
const patchText = (max) => z.union([trimmed(max), z.null()]).transform((v) => v ? v : null).optional();
const patchDate = z.union([
	dayString,
	z.literal(""),
	z.null()
]).transform((v) => v ? v : null).optional();
/** At least one field must actually be present. */
const notEmptyPatch = (body) => Object.values(body).some((value) => value !== void 0);
const CreateCaseBody = z.object({
	salespersonId: z.number().int().positive().nullish().transform((v) => v ?? null),
	title: requiredText(200, "title is required"),
	opportunityId: optionalText(80),
	blockerCode: optionalText(16),
	blockerName: optionalText(160),
	disposition: optionalText(40),
	qualifier: optionalText(120),
	confidence: optionalText(40),
	evidence: optionalText(4e3),
	region: optionalText(80),
	salesforceStage: optionalText(80),
	priority: z.enum(CASE_PRIORITIES).default("medium"),
	status: z.enum(CASE_STATUSES).default("open"),
	followUpOn: isoDate,
	source: z.enum(CASE_SOURCES).default("manual"),
	genieQuestion: optionalText(2e3),
	genieAnswer: optionalText(8e3),
	genieSql: optionalText(8e3),
	genieConversationId: optionalText(120)
});
const UpdateCaseBody = z.object({
	salespersonId: z.number().int().positive().nullable().optional(),
	title: trimmed(200).min(1).optional(),
	status: z.enum(CASE_STATUSES).optional(),
	priority: z.enum(CASE_PRIORITIES).optional(),
	followUpOn: patchDate,
	evidence: patchText(4e3)
}).refine(notEmptyPatch, { message: "no fields to update" });
const CreateFeedbackBody = z.object({
	note: requiredText(4e3, "note is required"),
	coachingRating: z.number().int().min(1).max(5).nullish().transform((v) => v ?? null),
	findingAccurate: z.boolean().nullish().transform((v) => v ?? null)
});
const CreateActionBody = z.object({
	description: requiredText(500, "description is required"),
	owner: optionalText(160),
	dueOn: isoDate
});
const UpdateActionBody = z.object({
	description: trimmed(500).min(1).optional(),
	owner: patchText(160),
	dueOn: patchDate,
	done: z.boolean().optional()
}).refine(notEmptyPatch, { message: "no fields to update" });
const CreateSalespersonBody = z.object({
	fullName: requiredText(160, "fullName is required"),
	agentId: optionalText(64),
	teamName: optionalText(120),
	region: optionalText(80),
	email: optionalText(200)
});
const UpdateSalespersonBody = z.object({
	fullName: trimmed(160).min(1).optional(),
	agentId: patchText(64),
	teamName: patchText(120),
	region: patchText(80),
	email: patchText(200),
	active: z.boolean().optional()
}).refine(notEmptyPatch, { message: "no fields to update" });
const CaseListQuery = z.object({
	status: z.enum(CASE_STATUSES).optional(),
	priority: z.enum(CASE_PRIORITIES).optional(),
	salespersonId: z.coerce.number().int().positive().optional(),
	blockersOnly: z.enum(["true", "false"]).optional().transform((v) => v === "true"),
	search: trimmed(120).optional()
});

//#endregion
export { BLOCKING_DISPOSITIONS, CaseListQuery, CreateActionBody, CreateCaseBody, CreateFeedbackBody, CreateSalespersonBody, SCHEMA, UpdateActionBody, UpdateCaseBody, UpdateSalespersonBody };