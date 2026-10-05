# Demo cue card

## Opening

**Problem:** call-level blocker signal is trapped in transcripts; review is sampled, late, and hard to aggregate.

**Outcome:** conversation → evidence-backed blocker → owned coaching case → measurable action.

**Ask:** one team, four weeks, jointly owned by Sales Operations, Inside Sales, and a data-platform partner.

**Watch for:** executive—coverage, speed, capacity; architect—governance, provenance, system boundaries.

## Click path

1. **Deck:** customer problem and modeled economics.
2. **Architecture:** Auto Loader → Delta pipeline/AI Functions → dashboard/Genie → Lakebase coaching state.
3. **Coaching queue:** KPIs → blockers by code → load by rep → Real blockers only.
4. **Ask Genie:** Blockers to coach now → answer → generated SQL → Create coaching case.
5. **Case:** evidence → provenance → assign/priority/date/status → feedback/accuracy → action → activity.
6. **Deck:** pilot scorecard and decision.

## Tell–show–tell anchors

**Queue**

- Tell: “Managers need to decide where coaching time has the highest return.”
- Show: priority, overdue work, blocker mix, rep load.
- Tell: “This reduces time to first coaching action.”

**Genie**

- Tell: “Managers can ask the next question without learning the schema.”
- Show: answer and generated SQL.
- Tell: “Natural language accelerates discovery; SQL and evidence preserve trust.”

**Case**

- Tell: “An insight has no value until someone owns the next action.”
- Show: evidence, assignment, feedback, action, audit history.
- Tell: “Now acceptance, coaching, and execution are measurable.”

## Numbers

- Reference run: **579 rows**, **273 classified findings**, **47 hard blockers**, **42 friction findings**, all six codes.
- Planning model: **500 opportunities/month**, **15 → 2 minutes**, **108 hours/month**, **87% effort reduction**.
- Modeled capacity value: **$8.1K/month / $97.5K/year** at $75/hour.
- Build proof: production build passed; **61/61 tests** passed.

Always label economics as modeled assumptions, not realized results.

## Pilot gates

- ≥90% processing coverage.
- Median coaching action under one business day.
- ≥70% manager acceptance.
- ≥80% actions completed by due date.
- ≥60% measured review-effort reduction.

## Fast objection answers

**“ROI is hypothetical.”** Correct; the pilot measures the baseline and stops if it misses the 60% effort threshold.

**“Will managers use it?”** It supports an existing decision—who to coach, on what, by when—and adoption is measured through action time and completion.

**“Hallucinations?”** Constrained taxonomy, required evidence, visible SQL, confidence/disposition rules, and manager accuracy feedback.

**“PII/security?”** Synthetic demo; Unity Catalog identity for reads, masking support, dedicated Lakebase schema, actor-attributed writes.

**“Why Lakebase?”** Delta is the analytical record; Postgres provides transactional, low-latency coaching CRUD.

**“Salesforce integration?”** Synthetic phone join is a demo seam; production uses governed ingestion and stable CRM keys.

**“Known limits?”** Synthetic demo, unproven lift, manual rep attribution, phone join not production MDM, pinned follow-up model, client bundle warning.

## Final line

> “This is not a request to trust AI with the customer relationship. It is a request to test whether governed AI helps managers find, verify, and act on the conversations that matter—faster and with better evidence.”

