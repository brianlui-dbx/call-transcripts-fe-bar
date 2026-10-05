# Turn every lost sale into a coached next action

## Offer Blocker Intelligence on Databricks

**Business outcome:** convert unstructured sales calls into a governed queue of price, fee, contract, availability, and promotion barriers—fast enough for a manager to intervene while the opportunity is still actionable.

**Decision requested:** sponsor a measured pilot with Sales Operations and Inside Sales.

Superior Plus Propane · Evaluation submission · October 2026

# The business loses signal between the call and the coaching moment

Sales calls contain the reason an offer stalled, but the signal is trapped in long transcripts.

| Today | Business consequence |
|---|---|
| Managers sample calls manually | Coverage is partial and selection is inconsistent |
| Blockers are coded after the fact | Follow-up arrives after buyer intent cools |
| Evidence lives in prose | Pricing, offer, and enablement teams cannot aggregate patterns |
| Coaching actions live outside analytics | Ownership and outcomes are hard to audit |

The opportunity is not “better transcription.” It is a closed loop from **conversation → blocker → owner → action → outcome**.

# One governed flow turns calls into action

1. **Ingest** transcripts incrementally with Auto Loader and deduplicate by call ID.
2. **Contextualize** each call against a synthetic CRM opportunity and ordered dialogue.
3. **Classify** six offer-blocker categories with Databricks AI Functions.
4. **Explain** every finding with disposition, confidence, and quoted evidence.
5. **Explore** patterns in an AI/BI dashboard and curated Genie space.
6. **Act** in the coaching app: assign a case, capture notes, agree actions, and retain an audit trail in Lakebase.

**Governance by design:** Unity Catalog tables, evidence-bearing output, PII-masked summaries, service-principal write-back, and no customer data in this submission.

# The reference run proves the pipeline emits decision-ready output

The executed, pseudonymized reference output contains:

| Measure | Observed result |
|---|---:|
| Total output rows | 579 |
| Classified 4A–4F findings | 273 |
| Hard blockers | 47 |
| Friction findings | 42 |
| Resolved issues | 27 |
| Taxonomy coverage | All 6 codes |

Example: a customer rejects a standard installation fee and leaves to shop elsewhere → **4B Ancillary Fees · hard_blocker · High confidence**.

The build also passed **61/61 application tests**, TypeScript compilation, lint, formatting, and production bundling. Full text evidence is committed under `submission/`.

# Modeled pilot economics: reclaim 108 manager hours each month

Illustrative planning model—validate with pilot telemetry.

| Assumption | Value |
|---|---:|
| Opportunities reviewed per month | 500 |
| Manual review and coding | 15 min/opportunity |
| AI-assisted triage | 2 min/opportunity |
| Time reclaimed | **108 hours/month** |
| Review effort reduction | **87%** |

Formula: `500 × (15 − 2) ÷ 60 = 108 hours/month`.

At a loaded manager cost of **$75/hour**, that is approximately **$8.1K/month** or **$97.5K/year** of capacity before counting recovered deals. These are modeled benefits, not realized claims.

# Value for the executive sponsor

**Revenue visibility**

- Quantify which offer mechanics suppress conversion instead of relying on anecdotes.
- Detect shifts in rate, fee, contract, serviceability, and promotion objections.

**Operating leverage**

- Move from sampled call review toward systematic coverage.
- Give managers evidence-first cases rather than another dashboard to interpret.

**Governance and trust**

- Preserve source evidence, generated SQL, manager feedback, and action history.
- Keep analytical read paths and operational write-back under Databricks governance.

Sponsor KPI: **cost per reviewed opportunity**, **coverage rate**, and **conversion lift on coached opportunities**.

# Value for the Sales Operations domain owner

**Every day**

- Filter the queue to real blockers, overdue follow-ups, rep, or blocker code.
- Open a case with the exact evidence and AI confidence in context.
- Assign coaching, record the handling score, and track agreed actions.
- Ask Genie follow-up questions and preserve answer provenance.

**Every week**

- Review hard-blocker and friction trends by category.
- Separate product/offer gaps from issues the representative resolved.
- Feed validated false positives back into prompt and taxonomy calibration.

Domain-owner KPI: **time to first coaching action**, **action completion**, **finding acceptance rate**, and **repeat-blocker rate**.

# A four-week pilot converts modeled value into measured value

| Week | Scope | Exit criterion |
|---|---|---|
| 1 | Baseline manual review time, select one team, confirm taxonomy | Agreed KPI definitions and safe data contract |
| 2 | Run pipeline and manager queue in shadow mode | ≥90% records processed; evidence present on every assigned finding |
| 3 | Managers coach from the queue and rate findings | ≥70% manager acceptance; median action time measured |
| 4 | Compare coached cohort and baseline; tune thresholds | Go/no-go recommendation with measured capacity and conversion signals |

Guardrails: synthetic data for demos, least-privilege access, human review before action, and no claim of causality without a controlled comparison.

# Decision: fund the pilot and hold it to buyer KPIs

**Approve** a one-team, four-week pilot owned jointly by Sales Operations and Inside Sales leadership.

Success means:

- **Coverage:** at least 90% of eligible opportunities analyzed.
- **Speed:** median time from call to coaching action below one business day.
- **Trust:** at least 70% of surfaced blockers accepted by managers.
- **Execution:** at least 80% of agreed actions completed by due date.
- **Economics:** measured review effort reduced by at least 60%.

The build is ready for evaluation: deployable code, dashboard and Genie definitions, tested coaching app, text-readable execution evidence, and a data-safe synthetic demo.

