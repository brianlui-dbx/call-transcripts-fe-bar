# AI demo roleplay walkthrough

Use this as a rehearsal guide, not a script to read verbatim. Target **22 minutes of presentation and demo**, leaving 3–8 minutes for questions inside a 20–30 minute session.

## The audience and the decision

Assume both personas are in the room:

- **Executive sponsor:** VP of Sales or Sales Operations. Cares about conversion, manager capacity, adoption, risk, and time to value.
- **Technical stakeholder:** Enterprise Data Architect or Data Platform Lead. Cares about architecture, integration, security, data quality, operations, and lock-in.

The decision you want is narrow and credible:

> Approve a one-team, four-week measured pilot, jointly owned by Sales Operations and Inside Sales leadership.

Do not ask for an enterprise rollout. Do not claim the modeled ROI has already been realized.

## Before the session

Have these ready in separate tabs:

1. The presentation deck, on slide 1.
2. The coaching app, on **Coaching queue**.
3. The app's **Ask Genie** page in a second tab if possible.
4. One populated coaching case with evidence, Genie provenance, feedback, an action item, and activity history.
5. The architecture slide or repository README for technical questions.
6. [`execution-evidence.md`](execution-evidence.md) as a backup if a live service is unavailable.

Use only the synthetic demo data. Confirm that the app and Genie session are responsive. Reset the Genie conversation. Pick a case whose disposition is `hard_blocker` or `friction`, preferably 4B Ancillary Fees or 4A Rate Competitiveness.

## Run of show

| Time | Segment | Primary audience | Outcome |
|---:|---|---|---|
| 0:00–2:00 | Customer, problem, decision | Both | Establish relevance before showing software |
| 2:00–4:00 | Value hypothesis and demo promise | Executive | Define KPIs and what the demo must prove |
| 4:00–6:00 | Governed flow | Technical | Explain the architecture at one-slide altitude |
| 6:00–9:00 | Coaching queue | Executive/domain owner | Show prioritization and operating visibility |
| 9:00–13:00 | Ask Genie | Both | Move from a question to a traceable finding |
| 13:00–17:00 | Coaching case | Both | Turn insight into an assigned, auditable action |
| 17:00–19:00 | Trust and operations | Technical | Address security, quality, and failure handling |
| 19:00–22:00 | Economics, pilot, close | Executive | Land value and ask for the pilot |

## 1. Open with the customer and problem — 2 minutes

### Tell

> “Let me start with the business problem, not the technology. Inside-sales calls already contain the reason an offer progressed, stalled, or died. Today that signal is trapped in transcripts, so managers sample a small number of calls, coaching arrives late, and pricing or offer teams hear anecdotes instead of measurable patterns.”

> “What I am going to show is a closed loop: a conversation becomes an evidence-backed blocker, the blocker becomes an owned coaching case, and the action and outcome become measurable. The decision I am asking for is a four-week pilot with one team—not an enterprise rollout.”

### Set up both personas

> “For the sales leader, watch whether this shortens time to coaching and increases review coverage. For the data lead, watch how the answer remains governed and traceable from the lakehouse query through the operational write-back.”

### Land the business stakes

> “The goal is not to summarize more calls. It is to act on the right calls while the opportunity is still recoverable.”

## 2. State the value hypothesis and demo promise — 2 minutes

Show the problem and modeled-economics slides.

### Tell

> “I will prove three things in the demo. First, a manager can find the small set of calls that deserve attention. Second, every recommendation carries evidence and query provenance. Third, the manager can assign, coach, and track the next action without leaving the workflow.”

> “The planning model uses 500 opportunities a month, 15 minutes of manual review, and two minutes of AI-assisted triage. That implies 108 hours of monthly manager capacity, or an 87% effort reduction. Those are assumptions for a pilot to validate—not realized savings.”

Name the buyer KPIs:

- Coverage of eligible opportunities analyzed.
- Median time from call to first coaching action.
- Manager acceptance rate for AI findings.
- Action completion by due date.
- Review cost per opportunity and, over time, conversion lift for coached opportunities.

### Transition

> “Now I will show how the design supports that outcome without creating an ungoverned side system.”

## 3. Explain the governed flow — 2 minutes

Show the architecture slide. Do not open source code unless asked.

### Tell

> “Calls land incrementally through Auto Loader and are deduplicated by call ID. The pipeline orders dialogue by opportunity, joins CRM context, and uses Databricks AI Functions to classify six blocker categories, disposition, confidence, and evidence.”

> “The gold tables are the governed analytical record. The AI/BI dashboard and Genie read from that record. The coaching app uses Genie for analysis and Lakebase for operational state—assignment, feedback, actions, and audit history.”

### Technical detail, kept concise

- Unity Catalog governs pipeline tables and the landing volume.
- `ai_classify`, `ai_extract`, sentiment, summarization, masking, similarity, grammar correction, and `ai_query` are used for specific tasks.
- Genie executes on behalf of the signed-in user.
- Lakebase writes use the app service principal; the signed-in manager is recorded as actor/author.
- The app does not directly issue ad hoc Unity Catalog queries from custom endpoints.

### Land the meaning

> “That separation matters: governed lakehouse data remains the source of analytical truth, while Lakebase handles low-latency workflow state. We are not copying the entire lakehouse into an app database.”

## 4. Show the coaching queue — 3 minutes

Open **Coaching queue**.

### Tell before clicking

> “A sales manager does not start the day by reading transcripts. They start by deciding where coaching time has the highest return. This queue is that decision surface.”

### Show

1. Point to **Open**, **In coaching**, **Overdue follow-ups**, and **Resolved**.
2. Point out the source line: coaching records in Lakebase, last refresh, recent cases, and open actions.
3. Show **Active cases by blocker code** and **Load by salesperson**.
4. Turn on **Real blockers only** or filter to `hard_blocker`/`friction` cases.
5. Briefly filter by salesperson or search for a blocker.

Do not narrate every control. Use one example:

> “If ancillary fees are creating more active cases than rate pressure, the manager can direct coaching and also raise a product-policy question with evidence. If one rep has a high load and a low handling score, that is a different intervention.”

### Tell after showing

> “The business outcome is prioritization: less time hunting for a call and more time on the cases most likely to affect progression. The KPI this screen supports is time to first coaching action.”

## 5. Ask Genie and inspect provenance — 4 minutes

Open **Ask Genie**.

### Tell before clicking

> “The queue answers known operational questions. Genie handles the next question a manager did not predefine, without requiring them to know the schema.”

### Show

1. Choose **Blockers to coach now**.
2. Read only the most relevant line of the answer.
3. Open **Generated SQL**.
4. Point to the per-answer warning: AI-generated; review SQL before acting.
5. Click **Create coaching case** for the selected finding.

If the live result is slow, use **Fee objections (4B)** because it maps cleanly to the taxonomy and value story.

### Speak to each persona

To the executive:

> “The manager got from a business question to a short list of actionable cases without waiting for a custom report.”

To the technical stakeholder:

> “The answer is not a black box. The app preserves the original question, narrative answer, generated SQL, and conversation ID. The signed-in user's permissions still govern the Genie read.”

### Tell after showing

> “This is the trust boundary: natural language accelerates discovery, but evidence and SQL remain available for review before a manager coaches a person.”

## 6. Turn the finding into accountable coaching — 4 minutes

Open the newly created case, or use the prepared case if creation is slow.

### Tell before clicking

> “An insight has no value until someone owns the next action. This workspace closes that gap.”

### Show

1. **The finding:** blocker code/name, impact, qualifier, confidence, region, Salesforce stage, and evidence.
2. **Genie provenance:** question, answer, and generated SQL.
3. **Coaching status:** assign the synthetic rep, set priority, follow-up date, and change status to **In coaching**.
4. **Coaching notes & feedback:** add a short note, rate how the rep handled it, and mark whether the AI finding was accurate.
5. **Action item:** add one specific commitment with an owner and due date.
6. **Activity:** show that changes are retained as an audit trail.

Suggested synthetic note:

> “Practiced surfacing the total annual cost before presenting the rate. Rep will confirm fee thresholds before the next quote.”

Suggested action:

> “Use the total-cost talk track on the next three fee-sensitive opportunities.”

### Tell after showing

> “Now we can measure more than model output. We can measure whether managers accepted the finding, whether coaching happened, whether the action was completed, and eventually whether the opportunity outcome changed.”

> “For the sponsor, that is accountability. For the architect, it is a clean feedback signal for evaluating and improving the model.”

## 7. Address trust, security, and operations — 2 minutes

Use the architecture slide or remain on the case provenance panel.

### Say proactively

> “There are three guardrails I would require in the pilot. First, human review before coaching action. Second, evidence on every assigned finding and explicit handling for insufficient evidence. Third, manager feedback captured as evaluation data rather than silently treating every AI answer as correct.”

> “The demo repository contains only synthetic records, reserved 555 phone numbers, and synthetic identifiers. In production, access follows Unity Catalog and workspace identity, summaries can be PII-masked, and operational writes are isolated in a dedicated Lakebase schema.”

> “Operationally, Auto Loader and SCD Type 1 deduplication make ingestion rerunnable. Pipeline expectations drop invalid phone/region rows. App validation, typed contracts, parameterized SQL, and 61 automated tests cover the workflow.”

### Land the meaning

> “The risk posture is assistive, evidence-first, and measurable. The system recommends where to look; a manager decides what to do.”

## 8. Close with economics and the pilot ask — 3 minutes

Return to the pilot and decision slides.

### Tell

> “The reference run proves the pipeline emits usable classifications: 579 output rows, 273 classified findings, including 47 hard blockers and 42 friction findings across all six codes. It does not yet prove production accuracy or revenue lift—that is what the pilot measures.”

> “In four weeks, we baseline manual review time, run in shadow mode, let managers coach from the queue, collect acceptance and handling scores, and compare the coached cohort with the baseline.”

### Ask

> “I am asking for one inside-sales team, one Sales Operations owner, and a data-platform partner for four weeks. We proceed only if we achieve at least 90% processing coverage, median coaching action within one business day, at least 70% manager acceptance, 80% action completion, and at least 60% measured effort reduction.”

### Final line

> “This is not a request to trust AI with the customer relationship. It is a request to test whether governed AI can help managers find, verify, and act on the conversations that matter—faster and with better evidence.”

Then stop. Let the personas respond.

## Objection handling

Use this pattern for every answer:

1. Acknowledge the concern without surrendering the value case.
2. Answer first at the questioner's altitude.
3. Give one concrete proof point.
4. State the pilot guardrail or measurement.
5. Bridge back to the decision.

### Executive objections

#### “Why is this worth funding?”

> “The immediate value is manager capacity and faster intervention, not an assumed conversion miracle. At the planning volume, reducing review from 15 minutes to two minutes would reclaim 108 hours a month. The pilot measures the actual baseline, acceptance, action time, and effort reduction before we make a larger investment.”

#### “Those savings are hypothetical.”

> “Correct—they are a value hypothesis, not a realized claim. That is why the ask is a four-week pilot with an explicit 60% effort-reduction threshold. If the baseline or adoption does not support the economics, we stop.”

#### “Will sales managers actually use it?”

> “Adoption depends on fitting their existing decision: which rep needs coaching, on what, by when. The workflow starts with a prioritized queue and ends with an assigned action, rather than asking managers to explore a dashboard. We measure weekly active managers, time to action, finding acceptance, and action completion.”

#### “Could this unfairly score or punish reps?”

> “It should not be used as an autonomous performance score. Findings are evidence-backed suggestions, managers record whether the finding was accurate, and human review precedes coaching. The pilot policy should prohibit automated employment decisions and use the data for coaching and model evaluation.”

#### “Why not just buy a call-intelligence tool?”

> “That may be the right benchmark. The differentiation here is a customer-specific blocker taxonomy, governed CRM and lakehouse context, transparent SQL and evidence, and workflow data that remains on the Databricks platform. In the pilot, I would compare total cost, fit, governance, and time to adapt—not assume custom is automatically better.”

#### “How quickly do we see value?”

> “The first operational signal arrives in week two during shadow mode: processing coverage, finding quality, and review time. By week four we have adoption and capacity evidence. Conversion lift will require a longer and better-controlled observation window.”

### Technical objections

#### “Walk me through the architecture and system of record.”

> “Unity Catalog Delta tables are the analytical system of record. Auto Loader ingests; the declarative pipeline deduplicates, joins CRM context, assembles opportunity dialogue, and writes gold findings. Dashboard and Genie consume those curated tables. Lakebase is deliberately limited to operational coaching state. The app links the two with stored Genie provenance rather than duplicating the analytical model into Postgres.”

#### “How do you control hallucinations?”

> “We constrain the task with a six-code taxonomy, code-specific qualifier labels, explicit disposition and confidence rules, and required transcript evidence. Genie answers expose generated SQL. Managers confirm finding accuracy, and low-confidence or insufficient-evidence cases can be excluded from action. The pilot acceptance rate becomes an evaluation dataset.”

#### “What happens when data is malformed or duplicated?”

> “Auto Loader tracks files incrementally, and AUTO CDC keeps one latest record per call ID. Pipeline expectations enforce ten-digit normalized phones and allowed regions, dropping invalid rows rather than contaminating downstream views. I would add operational monitoring for dropped-row counts and freshness as a production gate.”

#### “How is PII protected?”

> “The submitted demo uses only synthetic data. In production, raw access is governed in Unity Catalog, the pipeline can generate PII-masked summaries with `ai_mask`, and users see only what their workspace identity permits. Lakebase contains coaching state in a dedicated schema; service-principal writes are attributed to the signed-in manager. Retention and field-level access would be agreed before production.”

#### “Why Lakebase and not Delta for everything?”

> “They serve different workloads. Delta is the governed analytical record for scalable transcript analysis. Coaching cases need low-latency CRUD, referential integrity, and transactional updates, which fit Postgres. Keeping the boundary explicit avoids using the warehouse as an application database or copying all analytics into Postgres.”

#### “What is the integration path to Salesforce?”

> “The demo uses a synthetic opportunity dimension joined by normalized phone. Production should replace that seed with a governed Salesforce ingestion path and stable customer/opportunity keys, then write coaching outcomes back only through an approved integration. I would not use phone as the long-term master key.”

#### “Can it scale, and what controls cost?”

> “Ingestion is incremental, transformations are declarative, and inference is scoped per opportunity rather than repeatedly processing the full corpus. We would monitor calls processed, tokens or function consumption, pipeline duration, warehouse usage, and cost per reviewed opportunity. The pilot gives us the measurements needed to choose batch cadence and model size.”

#### “Are we locked into one model?”

> “The classification logic is expressed through Databricks AI Functions and a versioned prompt/taxonomy. The bundle exposes a model-endpoint variable for relevant `ai_query` workloads, although one follow-up-email query is currently pinned and should be parameterized before production. We would evaluate replacement models against the same accepted-finding dataset.”

#### “What are the known limitations?”

> “The active demo is small and synthetic; the reference output proves execution, not production accuracy. Rep attribution is currently assigned by a manager because the gold table does not yet expose agent ID. Conversion lift is unproven, phone-based CRM matching is not a production master-data strategy, and the client bundle has a non-blocking size warning. None blocks a measured pilot, but each has a production exit criterion.”

## Reading the room

When the executive asks a technical question, answer in this order:

> **Outcome → control → proof.** “The business risk is an incorrect coaching action. We control it with evidence and human confirmation. You can see the exact evidence, SQL, and manager accuracy verdict on this case.”

When the architect asks a technical question, answer in this order:

> **Boundary → mechanism → operational implication.** “Delta is the analytical record; Lakebase stores workflow state. Genie reads on behalf of the user, while service-principal writes are actor-attributed. That gives governed access without using the warehouse as an OLTP system.”

If one persona looks lost, bridge explicitly:

> “Let me translate that into the business implication…”

If one persona wants more depth:

> “The short answer is yes. The implementation detail is…”

Keep answers under 60 seconds unless they ask a follow-up.

## Demo recovery plan

If Genie is slow:

> “While that runs, the important design point is that the generated SQL and conversation ID are preserved. I have a completed case showing the downstream workflow.”

Move to the prepared case.

If the app is unavailable:

1. State the issue once without blaming the environment.
2. Use the deck to narrate the same conversation → finding → case → action flow.
3. Open [`execution-evidence.md`](execution-evidence.md) and [`model-output-sample.csv`](model-output-sample.csv).
4. Cite the production build and 61/61 test result.

Say:

> “The live service is unavailable, so I will use the committed text evidence rather than pretend the click path worked. The value story and controls are the same.”

If a result differs from rehearsal:

> “That variance is exactly why manager acceptance is a pilot KPI. I would inspect the SQL and evidence before turning this into a coaching action.”

## Final rehearsal checklist

- Can you explain the customer problem in 30 seconds without naming a Databricks feature?
- Can you state the decision request in one sentence?
- Does every screen have a tell-before and tell-after business takeaway?
- Can you explain the Delta/Genie/Lakebase boundary in under 45 seconds?
- Do you label 108 hours and $97.5K/year as modeled assumptions?
- Can you name the five pilot success metrics without reading them?
- Can you answer accuracy, security, integration, cost, and adoption objections in under a minute each?
- Can you finish the core demo in 17 minutes if questions arrive early?
- Have you rehearsed the recovery path without apologizing repeatedly?

