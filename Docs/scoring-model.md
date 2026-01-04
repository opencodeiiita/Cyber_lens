# Threat Scoring & Verdict Logic Proposal

## 1. Overview
This document proposes a threat scoring and verdict model for aggregating results from multiple threat-intelligence providers.  
The goal is to convert diverse provider signals into a single numeric threat score and a final verdict: benign, suspicious, or malicious.

---

## 2. Inputs

Each provider contributes the following inputs:

- Provider name
- Provider verdict / flags: benign, suspicious, malicious
- Provider confidence: high, medium, low
- Provider status: success, timeout, or failed

---

## 3. Scoring Logic

### 3.1 Base Score per Provider

| Provider Verdict | Base Score |
|------------------|------------|
| Benign           | 0          |
| Suspicious       | 50         |
| Malicious        | 100        |

---

### 3.2 Confidence Adjustment

| Confidence | Multiplier |
|-----------|------------|
| High      | 1.0        |
| Medium    | 0.75       |
| Low       | 0.5        |

Adjusted Score = Base Score × Confidence Multiplier

---

### 3.3 Provider Weighting

Providers are weighted based on reliability:

- High-trust provider → 1.0
- Medium-trust provider → 0.7
- Low-trust provider → 0.5

Weighted Score = Adjusted Score × Provider Weight

---

### 3.4 Combining Provider Results

- Only successful provider responses are included.
- Final Threat Score is calculated as:

Final Score = (Sum of weighted provider scores) / (Sum of provider weights)

This keeps the final score between 0 and 100.

---

### 3.5 Conflicting Results Handling

- Mixed benign and malicious inputs average out naturally.
- High-confidence, high-trust malicious providers influence the score more.
- This reduces false positives while still flagging risky indicators.

---

## 4. Verdict Thresholds

| Score Range | Final Verdict |
|------------|---------------|
| 0 – 29     | Benign        |
| 30 – 69    | Suspicious    |
| 70 – 100  | Malicious     |

---

## 5. Examples

### Example 1: Malicious Indicator
Providers:
- Provider A: Malicious, high confidence, high trust
- Provider B: Malicious, medium confidence, medium trust
- Provider C: Suspicious, high confidence, low trust

Final Score: ~82  
Verdict: Malicious

---

### Example 2: Mixed Signals
Providers:
- Provider A: Benign, high confidence, high trust
- Provider B: Suspicious, medium confidence, medium trust
- Provider C: Malicious, low confidence, low trust

Final Score: ~48  
Verdict: Suspicious

---

### Example 3: Mostly Benign
Providers:
- Provider A: Benign, high confidence, high trust
- Provider B: Benign, medium confidence, medium trust
- Provider C: Timeout

Final Score: ~8  
Verdict: Benign

---

## 6. Edge Cases

### Single Provider Available
- Use that provider’s weighted score directly.
- Verdict derived from standard thresholds.

### All Providers Timeout
- No score calculated.
- Verdict set to Unknown.
- IOC should be retried or manually reviewed.

### Strongly Conflicting Results
- High-trust providers have more impact than low-trust ones.
- Result often falls under Suspicious for safety.

---

## 7. Trade-offs

- Simple and explainable scoring
- Flexible for adding new providers
- Requires tuning of weights and thresholds over time

---

## 8. Conclusion
This scoring model provides a clear, realistic, and extensible approach to aggregating threat-intelligence data into a single verdict while handling partial data and conflicting signals effectively.
