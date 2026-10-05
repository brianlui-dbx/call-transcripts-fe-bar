import { BLOCKING_DISPOSITIONS, SCHEMA } from "./domain.js";
import { fail } from "./http.js";

//#region server/coaching/summary-routes.ts
function registerSummaryRoutes(app, db) {
	app.get("/api/coaching-summary", async (_req, res) => {
		try {
			const blocking = [...BLOCKING_DISPOSITIONS];
			const [totals, byBlocker, bySalesperson] = await Promise.all([
				db.query(`SELECT CAST(COUNT(*) AS INT) AS total_cases,
                  CAST(COUNT(*) FILTER (WHERE status = 'open') AS INT) AS open_cases,
                  CAST(COUNT(*) FILTER (WHERE status = 'in_coaching') AS INT) AS in_coaching_cases,
                  CAST(COUNT(*) FILTER (
                        WHERE status = 'resolved' AND updated_at >= NOW() - INTERVAL '30 days'
                      ) AS INT) AS resolved_30d,
                  CAST(COUNT(*) FILTER (
                        WHERE follow_up_on < CURRENT_DATE AND status IN ('open', 'in_coaching')
                      ) AS INT) AS overdue_follow_ups,
                  CAST(COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS INT)
                    AS created_7d,
                  CAST((SELECT COUNT(*) FROM ${SCHEMA}.action_items WHERE NOT done) AS INT)
                    AS open_actions
             FROM ${SCHEMA}.coaching_cases`),
				db.query(`SELECT COALESCE(blocker_code, 'Unassigned') AS blocker_code,
                  COALESCE(blocker_name, 'No blocker code') AS blocker_name,
                  CAST(COUNT(*) AS INT) AS cases
             FROM ${SCHEMA}.coaching_cases
            WHERE status IN ('open', 'in_coaching')
            GROUP BY 1, 2
            ORDER BY cases DESC, blocker_code`),
				db.query(`SELECT s.id AS salesperson_id,
                  s.full_name,
                  CAST(COUNT(DISTINCT c.id) FILTER (
                        WHERE c.status IN ('open', 'in_coaching')
                      ) AS INT) AS active_cases,
                  CAST(COUNT(DISTINCT c.id) FILTER (
                        WHERE c.disposition = ANY($1)
                      ) AS INT) AS blocker_cases,
                  CAST(ROUND(AVG(f.coaching_rating), 2) AS DOUBLE PRECISION)
                    AS avg_coaching_rating
             FROM ${SCHEMA}.salespeople s
             LEFT JOIN ${SCHEMA}.coaching_cases c ON c.salesperson_id = s.id
             LEFT JOIN ${SCHEMA}.case_feedback f ON f.case_id = c.id
            WHERE s.active
            GROUP BY s.id, s.full_name
            ORDER BY active_cases DESC, s.full_name`, [blocking])
			]);
			const t = totals.rows[0];
			res.json({
				totals: {
					totalCases: t?.total_cases ?? 0,
					openCases: t?.open_cases ?? 0,
					inCoachingCases: t?.in_coaching_cases ?? 0,
					resolvedLast30Days: t?.resolved_30d ?? 0,
					overdueFollowUps: t?.overdue_follow_ups ?? 0,
					createdLast7Days: t?.created_7d ?? 0,
					openActions: t?.open_actions ?? 0
				},
				byBlocker: byBlocker.rows.map((row) => ({
					blockerCode: row.blocker_code,
					blockerName: row.blocker_name,
					cases: row.cases
				})),
				bySalesperson: bySalesperson.rows.map((row) => ({
					salespersonId: row.salesperson_id,
					fullName: row.full_name,
					activeCases: row.active_cases,
					blockerCases: row.blocker_cases,
					avgCoachingRating: row.avg_coaching_rating
				})),
				asOf: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (err) {
			fail(res, "Failed to load coaching summary", err);
		}
	});
}

//#endregion
export { registerSummaryRoutes };