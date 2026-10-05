#!/usr/bin/env python3
"""Fail when active demo data contains non-synthetic identifiers or phone numbers."""

from pathlib import Path
import csv
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA_FILES = sorted((ROOT / "superior-offer-blocker" / "data").glob("*.json"))
SEED_FILE = ROOT / "superior-offer-blocker" / "seeds" / "salesforce_opportunities.csv"
PHONE_RE = re.compile(r"(?<!\d)(?:\+?1[ .()-]*)?([2-9]\d{2})[ .()-]*(\d{3})[ .-]*(\d{4})(?!\d)")
SALESFORCE_ID_RE = re.compile(r"\b006[A-Za-z0-9]{12,15}\b")
EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)


def allowed_phone(match: re.Match[str]) -> bool:
    exchange, line = match.group(2), int(match.group(3))
    return exchange == "555" and 100 <= line <= 199


errors: list[str] = []
for path in [*DATA_FILES, SEED_FILE]:
    text = path.read_text(encoding="utf-8")
    if SALESFORCE_ID_RE.search(text):
        errors.append(f"{path.relative_to(ROOT)} contains a Salesforce-style ID")
    if EMAIL_RE.search(text):
        errors.append(f"{path.relative_to(ROOT)} contains an email address")
    for match in PHONE_RE.finditer(text):
        if not allowed_phone(match):
            errors.append(
                f"{path.relative_to(ROOT)} contains non-reserved phone number {match.group(0)!r}"
            )

for path in DATA_FILES:
    records = json.loads(path.read_text(encoding="utf-8"))
    for index, record in enumerate(records, start=1):
        if not str(record.get("id", "")).startswith("synthetic-call-"):
            errors.append(f"{path.relative_to(ROOT)} record {index} has a non-synthetic id")
        if not str(record.get("agentId", "")).startswith("SYN-REP-"):
            errors.append(f"{path.relative_to(ROOT)} record {index} has a non-synthetic agentId")

data_phones = {
    re.sub(r"\D", "", str(record.get("clientPhoneNumber", "")))[-10:]
    for path in DATA_FILES
    for record in json.loads(path.read_text(encoding="utf-8"))
}
with SEED_FILE.open(newline="", encoding="utf-8") as handle:
    seed_rows = list(csv.DictReader(handle))
seed_phones = {row["contact_phone"] for row in seed_rows}
if data_phones != seed_phones:
    errors.append("synthetic transcript phones and Salesforce seed phones do not match")
for index, row in enumerate(seed_rows, start=2):
    if not row["opportunity_id"].startswith("SYN-OPP-"):
        errors.append(f"{SEED_FILE.relative_to(ROOT)} row {index} has a non-synthetic opportunity id")

if errors:
    print("FAIL: submission data audit found issues:")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("PASS: active demo data uses only synthetic identifiers and reserved 555 phone numbers.")
