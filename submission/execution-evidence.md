# Execution evidence

Recorded on **2026-10-05** from commit base `8028d75` plus the submission-hardening changes in this working tree. This file is deliberately readable as plain text; screenshots are not required.

## 1. Production application build — passed

Working directory: `sales-coaching-app/offer-blocker-coach`

Command:

```text
NO_COLOR=1 npm run build
```

Observed output:

```text
> offer-blocker-coach@1.0.0 build:server
> tsc -b tsconfig.server.json && tsdown -c tsdown.server.config.ts

dist/server.js                    0.91 kB | gzip: 0.56 kB
dist/coaching/case-routes.js     13.33 kB | gzip: 3.30 kB
dist/coaching/schema.js           6.70 kB | gzip: 2.12 kB
dist/coaching/domain.js           4.53 kB | gzip: 1.63 kB
9 files, total: 35.90 kB
Build complete

> offer-blocker-coach@1.0.0 build:client
> tsc -b tsconfig.client.json && vite build --config client/vite.config.ts

5255 modules transformed.
client/dist/index.html                         0.84 kB | gzip:   0.39 kB
client/dist/assets/index-Dn8Q5SZj.css        126.35 kB | gzip:  19.68 kB
client/dist/assets/Arrow.dom-DpF2PpN1.js     210.82 kB | gzip:  48.96 kB
client/dist/assets/index-CWmPbj1d.js        1305.43 kB | gzip: 418.86 kB
built in 606ms
```

The build emitted a non-blocking large-chunk warning. It did not fail compilation or artifact generation.

## 2. Automated application tests — 61/61 passed

Command:

```text
NO_COLOR=1 npm test -- --reporter=verbose
```

Observed summary:

```text
Test Files  5 passed (5)
Tests      61 passed (61)
Duration   372ms
```

Coverage includes formatting/date behavior, request validation, parameterized SQL, three-state PATCH semantics, idempotent schema initialization, roster routes, coaching-case routes, feedback, action items, and audit events. The route tests bind an ephemeral localhost port.

## 3. Static checks — passed

Commands and observed results:

```text
$ npm run typecheck
> tsc -b tsconfig.server.json && tsc -b tsconfig.client.json
exit 0

$ npm run lint
> eslint .
exit 0

$ npm run format
Checking formatting...
All matched files use Prettier code style!
exit 0
```

## 4. Databricks model output — committed as text

The prior Databricks reference run produced **579 output rows**, of which **273** contained a classified 4A–4F issue. The committed rows in [`model-output-sample.csv`](model-output-sample.csv) are a pseudonymized excerpt of that executed output; the unsafe workbook source was removed from the submission tree.

Observed classification counts:

| Code | Classified rows |
|---|---:|
| 4A — Rate competitiveness | 28 |
| 4B — Ancillary fees | 80 |
| 4C — Commercial model | 75 |
| 4D — Contract mechanics | 38 |
| 4E — Availability/serviceability | 30 |
| 4F — Promotion eligibility | 22 |
| **Total** | **273** |

Observed disposition counts across classified rows:

| Disposition | Rows |
|---|---:|
| hard_blocker | 47 |
| friction | 42 |
| resolved | 27 |
| latent | 13 |
| mention_only | 143 |
| insufficient_evidence | 1 |

This is execution evidence, not a claim of production accuracy or causal business lift. The active repository data is now fully synthetic, so a fresh Databricks rerun will produce a new, smaller demo result.

## 5. Data-safety guard — passed

Command:

```text
python3 scripts/check_submission_data.py
```

Expected success output:

```text
PASS: active demo data uses only synthetic identifiers and reserved 555 phone numbers.
```

## Reproduce locally

```bash
cd sales-coaching-app/offer-blocker-coach
npm ci
npm run typecheck
npm run lint
npm run format
npm test
npm run build
```

Databricks bundle validation and rerun require the evaluator/operator to choose an authenticated CLI profile explicitly; the repository intentionally does not auto-select one.
