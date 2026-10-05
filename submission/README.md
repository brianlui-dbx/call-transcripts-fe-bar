# Evaluation submission guide

This directory is the evaluator's text-first entry point.

## Required build

- Build overview and architecture: [`../README.md`](../README.md)
- Deployable Databricks bundle: [`../superior-offer-blocker/`](../superior-offer-blocker/)
- Sales coaching application: [`../sales-coaching-app/offer-blocker-coach/`](../sales-coaching-app/offer-blocker-coach/)
- Text-readable execution evidence: [`execution-evidence.md`](execution-evidence.md)
- Pseudonymized model output rows: [`model-output-sample.csv`](model-output-sample.csv)

## Required presentation deck

- Attach this file in the deck field: [`offer-blocker-intelligence-deck.pdf`](offer-blocker-intelligence-deck.pdf)
- Text-readable source: [`offer-blocker-intelligence-deck.md`](offer-blocker-intelligence-deck.md)
- Rehearsal script and objection bank: [`demo-walkthrough.md`](demo-walkthrough.md)
- One-page presenter prompts: [`demo-cue-card.md`](demo-cue-card.md)

## Repository link

Use: <https://github.com/brianlui-dbx/superior-call-transcripts>

Anonymous HTTP access returned **200** on 2026-10-05. Reconfirm the link in a logged-out/private browser window after pushing this submission branch.

## Data-safety declaration

The active demo batches, Salesforce seed, and coaching roster are synthetic. Phone numbers use the North American reserved fictional range `555-0100` through `555-0199`; identifiers begin with `SYN-`. Legacy customer-derived DOCX, XLSX, and JSON examples were removed from the current tree. No secrets or credentials are committed.

Run the automated guard before pushing:

```bash
python3 scripts/check_submission_data.py
```
