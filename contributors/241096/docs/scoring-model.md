# Threat Scoring & Verdict Model

## 1. Purpose

This document proposes a clear and explainable model for calculating:

- A numeric threat score (0–100)
- A final verdict: benign, suspicious, or malicious

The model aggregates results from multiple threat-intelligence providers while handling:
- Conflicting signals
- Missing or failed providers
- Varying provider reliability

This system is intended to support analyst decisions, not replace them.

---

## 2. Inputs

Each provider response is treated as an independent signal and may include:

- Provider name
- Provider verdict: benign, suspicious, malicious, or unknown
- Provider confidence: low, medium, high
- Provider status: success, timeout, or error

Providers that fail or timeout are excluded from scoring but noted for confidence reduction.

---

## 3. Signal Normalization

All provider verdicts are normalized to a common numeric scale:

| Provider Verdict | Normalized Score |
|------------------|------------------|
| Malicious        | 100              |
| Suspicious       | 60               |
| Unknown          | 30               |
| Benign           | 0                |

This ensures consistency across providers with different internal scoring systems.

---

## 4. Provider Weighting

Not all providers are equally reliable.

Each provider is assigned a trust weight:

| Trust Level | Weight |
|------------|--------|
| High       | 1.0    |
| Medium     | 0.7    |
| Low        | 0.5    |

Provider-reported confidence further adjusts impact:

| Confidence | Multiplier |
|-----------|------------|
| High      | 1.0        |
| Medium    | 0.75       |
| Low       | 0.5        |

Effective Weight = Trust Weight × Confidence Multiplier

---

## 5. Score Aggregation Logic

Only successful provider responses are used.

The final threat score is calculated as a weighted average:

Final Score =
Σ(normalized_score × effective_weight)
-------------------------------------
Σ(effective_weight)

This guarantees the final score always lies between 0 and 100.

### Conflicting Results Handling
- Mixed benign and malicious signals pull the score toward the middle
- High-trust malicious signals outweigh low-trust benign ones
- No single provider can dominate the outcome

---

## 6. Verdict Thresholds

The numeric score is mapped to a final verdict:

| Score Range | Verdict     | Meaning |
|------------|-------------|--------|
| 0–29       | Benign      | No credible threat indicators |
| 30–69      | Suspicious  | Mixed or uncertain signals |
| 70–100    | Malicious   | Strong, corroborated threat |

Thresholds are intentionally conservative.

---

## 7. Example Scenarios

### Scenario 1: Strong Malicious Agreement

Inputs:
- Provider A: malicious, high confidence, high trust
- Provider B: malicious, medium confidence, medium trust
- Provider C: malicious, high confidence, medium trust

Result:
- Final Score: ~85
- Verdict: malicious

Reasoning:
Multiple trusted providers independently agree.

---

### Scenario 2: Mixed Signals

Inputs:
- Provider A: benign, high confidence, high trust
- Provider B: suspicious, medium confidence, medium trust
- Provider C: malicious, low confidence, low trust

Result:
- Final Score: ~45
- Verdict: suspicious

Reasoning:
Conflicting signals prevent a definitive conclusion.

---

### Scenario 3: Mostly Benign

Inputs:
- Provider A: benign, high confidence, high trust
- Provider B: benign, medium confidence, medium trust
- Provider C: suspicious, low confidence, low trust

Result:
- Final Score: ~15
- Verdict: benign

Reasoning:
Strong benign consensus outweighs weak suspicious signals.

---

## 8. Edge Cases

### Single Provider Available
- Score is derived from the single provider
- Confidence is reduced due to lack of corroboration
- Verdict often remains suspicious unless confidence is very high

---

### All Providers Timeout or Fail
- No score is calculated
- Verdict is set to unknown
- Manual review is recommended

The system does not guess.

---

### Strongly Conflicting Results
- Score trends toward the middle
- Verdict becomes suspicious
- Confidence is lowered

This reflects real-world ambiguity.

---

## 9. Trade-offs & Rationale

Why weighted averaging?
- Simple and explainable
- Avoids hard overrides
- Scales well as providers are added

Why a wide suspicious range?
- Most real-world IOCs are ambiguous
- Binary decisions increase false positives

Why conservative defaults?
- Security decisions have real consequences
- Safer to flag uncertainty than over-commit

---

## 10. Future Improvements

Possible extensions include:
- Dynamic provider trust based on historical accuracy
- Time-based decay for old intelligence
- IOC-type-specific scoring (IP vs URL vs hash)
- Analyst feedback loops

---

## Final Note

This model prioritizes clarity, safety, and explainability.
It is intentionally simple and suitable as a foundation for future refinement.

This model prioritizes clarity, safety, and explainability.
It is intentionally simple and suitable as a foundation for future refinement.
