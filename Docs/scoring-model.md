# Threat Scoring & Verdict Logic Model

**Author:** Ishan Raj Singh  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Input Specifications](#input-specifications)
4. [Scoring Logic](#scoring-logic)
5. [Verdict Thresholds](#verdict-thresholds)
6. [Edge Cases](#edge-cases)
7. [Example Scenarios](#example-scenarios)
8. [Trade-offs & Rationale](#trade-offs--rationale)
9. [Future Enhancements](#future-enhancements)

---

## Executive Summary

This document defines the threat scoring and verdict logic for the Cyber_lens project. The model aggregates results from multiple threat intelligence providers to produce:

- **Normalized Threat Score** (0-100)
- **Final Verdict** (benign, suspicious, malicious)

The design prioritizes:
- ✅ Transparency and explainability
- ✅ Handling of conflicting signals
- ✅ Resilience to partial data
- ✅ Industry-standard severity mapping

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   IOC Input (IP/URL/Hash)               │
└────────────────────┬────────────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │  Multi-Provider     │
          │  API Orchestrator   │
          └──────────┬──────────┘
                     │
        ╔════════════╧════════════╗
        ║                         ║
   ┌────▼────┐  ┌────▼────┐  ┌───▼────┐
   │VirusTotal│  │AbuseIPDB│  │GreyNoise│
   │  API     │  │  API    │  │  API   │
   └────┬────┘  └────┬────┘  └───┬────┘
        │            │            │
        └────────────┼────────────┘
                     │
          ┌──────────▼──────────┐
          │  Scoring Engine     │
          │  • Normalization    │
          │  • Weighting        │
          │  • Aggregation      │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │  Verdict Mapper     │
          │  • Threshold Check  │
          │  • Confidence Level │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │   Final Output      │
          │   • Score: 0-100    │
          │   • Verdict: enum   │
          │   • Confidence: %   │
          └─────────────────────┘
```

---

## Input Specifications

### Provider Response Structure

Each threat intelligence provider returns:

```json
{
  "provider": "VirusTotal",
  "status": "success" | "timeout" | "error",
  "raw_score": <provider-specific>,
  "verdict": "malicious" | "suspicious" | "benign" | "unknown",
  "confidence": 0.0-1.0,
  "detection_ratio": "5/70" (optional),
  "metadata": {
    "scan_date": "ISO-8601",
    "categories": ["malware", "phishing"],
    "threat_types": []
  }
}
```

### Supported Providers

| Provider | Base Weight | Reputation Multiplier | Notes |
|----------|-------------|----------------------|-------|
| VirusTotal | 1.0 | 1.2 | Industry standard, high coverage |
| AbuseIPDB | 1.0 | 1.0 | IP reputation specialist |
| GreyNoise | 1.0 | 1.0 | Internet noise detection |
| URLScan.io | 1.0 | 1.0 | URL/domain analysis |
| AlienVault OTX | 1.0 | 0.9 | Community-driven |

---

## Scoring Logic

### Step 1: Normalize Provider Scores

Convert provider-specific verdicts to normalized scores (0-100):

| Provider Verdict | Normalized Score | Rationale |
|-----------------|------------------|-----------|
| **malicious** | 100 | Definitive threat |
| **suspicious** | 60 | Requires investigation |
| **unknown** | 30 | Neutral/inconclusive |
| **benign** | 0 | Clean/safe |

### Step 2: Calculate Effective Weight

Each provider's contribution is weighted by:

```python
effective_weight = base_weight × reputation_multiplier × confidence × availability_factor

where:
  base_weight = 1.0 (equal baseline)
  reputation_multiplier = 0.9-1.2 (provider-specific)
  confidence = 0.0-1.0 (from provider response)
  availability_factor = 1.0 (success) or 0.0 (timeout/error)
```

### Step 3: Aggregate Final Score

```python
weighted_sum = Σ(normalized_score_i × effective_weight_i)
total_weight = Σ(effective_weight_i)

final_score = weighted_sum / total_weight  # Range: 0-100

# Apply floor/ceiling
final_score = max(0, min(100, final_score))
```

### Step 4: Calculate Confidence Metric

```python
response_rate = successful_providers / total_providers
signal_consensus = 1 - (std_dev_of_scores / 100)

overall_confidence = (response_rate × 0.6) + (signal_consensus × 0.4)
```

---

## Verdict Thresholds

### Primary Thresholds

| Score Range | Verdict | Action Level | Description |
|-------------|---------|--------------|-------------|
| **0 - 25** | `benign` | 🟢 Low | No threat detected, safe to allow |
| **26 - 65** | `suspicious` | 🟡 Medium | Potential risk, monitor/investigate |
| **66 - 100** | `malicious` | 🔴 High | Confirmed threat, block immediately |

### Confidence Modifiers

Apply confidence threshold overlay:

- **Low confidence** (<0.5): Append `_unconfirmed` flag
  - `suspicious_unconfirmed` → Manual review required
  - `malicious_unconfirmed` → Temporary quarantine pending review

- **High confidence** (≥0.8): No modification, trust verdict

### Special Cases

| Condition | Override Logic |
|-----------|----------------|
| **All providers benign + high confidence** | Force score = 0 (benign) |
| **Any provider malicious + confidence >0.9** | Minimum score = 70 (malicious) |
| **Detection ratio >50% (VirusTotal)** | Force score ≥ 75 |

---

## Edge Cases

### 1. Single Provider Available

**Scenario:** Only one provider responds successfully.

**Logic:**
```python
if successful_providers == 1:
    final_score = normalized_score × 0.9  # 10% confidence penalty
    confidence = min(provider_confidence, 0.75)
    verdict = map_score_to_verdict(final_score)
    flags.append("single_provider_warning")
```

**Example:**
- Input: VirusTotal returns malicious (confidence 0.95)
- Output: Score = 90, Verdict = malicious, Confidence = 0.75

---

### 2. All Providers Timeout

**Scenario:** Network issues, rate limits, or API unavailability.

**Logic:**
```python
if successful_providers == 0:
    final_score = 50  # Neutral default
    verdict = "unknown"
    confidence = 0.0
    flags.append("all_providers_failed")
    require_manual_review = True
```

**Example:**
- Output: Score = 50, Verdict = unknown, Action = Queue for manual review

---

### 3. Mixed Conflicting Signals

**Scenario:** Providers disagree significantly (e.g., benign vs malicious).

**Logic:**
```python
score_variance = calculate_variance(normalized_scores)

if score_variance > 1500:  # High variance threshold
    # Use median instead of mean
    final_score = median(normalized_scores)
    confidence = confidence × 0.7  # Reduce confidence
    flags.append("conflicting_signals")
```

**Example:**
- VirusTotal: malicious (100)
- AbuseIPDB: benign (0)
- GreyNoise: suspicious (60)
- Output: Score = 60 (median), Verdict = suspicious, Confidence = 0.56

---

### 4. Partial Provider Failure

**Scenario:** 2 out of 3 providers succeed.

**Logic:**
```python
# Normal aggregation with available providers
# No special handling needed if ≥2 providers respond
if successful_providers >= 2:
    # Proceed with standard scoring
    flags.append(f"partial_coverage_{failed_providers}")
```

---

### 5. Zero Detections (All Clean)

**Scenario:** All providers report benign with high confidence.

**Logic:**
```python
if all(score == 0 for score in normalized_scores) and avg_confidence > 0.8:
    final_score = 0
    verdict = "benign"
    confidence = avg_confidence
    flags.append("verified_clean")
```

---

## Example Scenarios

### Scenario 1: Clear Malicious IOC

**Input:** IP address `198.51.100.42`

**Provider Responses:**
```json
[
  {
    "provider": "VirusTotal",
    "verdict": "malicious",
    "confidence": 0.85,
    "detection_ratio": "35/70"
  },
  {
    "provider": "AbuseIPDB",
    "verdict": "malicious",
    "confidence": 0.95,
    "abuse_score": 100
  },
  {
    "provider": "GreyNoise",
    "verdict": "malicious",
    "confidence": 0.80,
    "classification": "malicious"
  }
]
```

**Calculation:**
```
VirusTotal:  100 × (1.0 × 1.2 × 0.85) = 102.0 (capped at 100)
AbuseIPDB:   100 × (1.0 × 1.0 × 0.95) = 95.0
GreyNoise:   100 × (1.0 × 1.0 × 0.80) = 80.0

Total Weight: 1.02 + 0.95 + 0.80 = 2.77
Weighted Sum: 100 + 95 + 80 = 275

Final Score: 275 / 2.77 ≈ 99.3 → 99
Confidence: (3/3 × 0.6) + (0.95 × 0.4) = 0.98
```

**Output:**
```json
{
  "score": 99,
  "verdict": "malicious",
  "confidence": 0.98,
  "flags": []
}
```

---

### Scenario 2: Suspicious with Low Detections

**Input:** URL `http://example-suspicious.com`

**Provider Responses:**
```json
[
  {
    "provider": "VirusTotal",
    "verdict": "suspicious",
    "confidence": 0.40,
    "detection_ratio": "5/70"
  },
  {
    "provider": "URLScan.io",
    "verdict": "benign",
    "confidence": 0.80
  },
  {
    "provider": "AlienVault",
    "verdict": "suspicious",
    "confidence": 0.50
  }
]
```

**Calculation:**
```
VirusTotal:  60 × (1.0 × 1.2 × 0.40) = 28.8
URLScan:     0  × (1.0 × 1.0 × 0.80) = 0
AlienVault:  60 × (1.0 × 0.9 × 0.50) = 27.0

Total Weight: 0.48 + 0.80 + 0.45 = 1.73
Weighted Sum: 28.8 + 0 + 27.0 = 55.8

Final Score: 55.8 / 1.73 ≈ 32
Confidence: (3/3 × 0.6) + (0.72 × 0.4) = 0.89
```

**Output:**
```json
{
  "score": 32,
  "verdict": "suspicious",
  "confidence": 0.89,
  "flags": ["low_detection_ratio"]
}
```

---

### Scenario 3: Mixed Signals (Conflict)

**Input:** Hash `5d41402abc4b2a76b9719d911017c592`

**Provider Responses:**
```json
[
  {
    "provider": "VirusTotal",
    "verdict": "malicious",
    "confidence": 0.90,
    "detection_ratio": "45/70"
  },
  {
    "provider": "GreyNoise",
    "verdict": "benign",
    "confidence": 0.85
  }
]
```

**Calculation:**
```
VirusTotal: 100 × 1.08 = 108 → 100
GreyNoise:  0   × 0.85 = 0

Variance: 2500 (high conflict)
→ Use median: 50

Total Weight: 1.08 + 0.85 = 1.93
Confidence: 0.875 × 0.7 = 0.61 (reduced due to conflict)
```

**Output:**
```json
{
  "score": 50,
  "verdict": "suspicious",
  "confidence": 0.61,
  "flags": ["conflicting_signals", "requires_review"]
}
```

---

### Scenario 4: Single Provider with Timeout

**Input:** Domain `test-domain.org`

**Provider Responses:**
```json
[
  {
    "provider": "VirusTotal",
    "status": "timeout"
  },
  {
    "provider": "URLScan.io",
    "verdict": "suspicious",
    "confidence": 0.70
  },
  {
    "provider": "AlienVault",
    "status": "error"
  }
]
```

**Calculation:**
```
Only URLScan succeeded:
Score: 60 × 0.9 = 54
Confidence: min(0.70, 0.75) = 0.70
```

**Output:**
```json
{
  "score": 54,
  "verdict": "suspicious",
  "confidence": 0.70,
  "flags": ["single_provider_warning", "partial_provider_failure"]
}
```

---

### Scenario 5: All Providers Fail

**Input:** IP `192.0.2.1`

**Provider Responses:**
```json
[
  {"provider": "VirusTotal", "status": "timeout"},
  {"provider": "AbuseIPDB", "status": "error"},
  {"provider": "GreyNoise", "status": "timeout"}
]
```

**Output:**
```json
{
  "score": 50,
  "verdict": "unknown",
  "confidence": 0.0,
  "flags": ["all_providers_failed", "requires_manual_review"]
}
```

---

## Trade-offs & Rationale

### Design Decisions

#### 1. Equal Base Weights vs Weighted Hierarchy

**Decision:** Equal base weights (1.0) with reputation multipliers

**Rationale:**
- ✅ Prevents over-reliance on single provider
- ✅ Allows community/newer providers to contribute meaningfully
- ✅ Reputation multiplier (0.9-1.2) provides subtle preference
- ❌ May dilute signals from highly reliable sources

**Alternative Considered:** Fixed hierarchy (VirusTotal=0.5, others=0.25 each)
- Rejected due to single point of failure risk

---

#### 2. Threshold Values (0-25, 26-65, 66-100)

**Decision:** Three-tier system with unequal ranges

**Rationale:**
- ✅ Aligns with CVSS severity model (Low/Medium/High)
- ✅ Wider "suspicious" range reflects real-world ambiguity
- ✅ Clear action mapping (allow/monitor/block)
- ❌ Binary decisions may prefer narrower thresholds

**Alternative Considered:** Five-tier (0-20-40-60-80-100)
- Rejected as overly granular for actionable decisions

---

#### 3. Confidence-Based Weighting

**Decision:** Multiply provider weight by confidence score

**Rationale:**
- ✅ Naturally down-weights uncertain providers
- ✅ Handles "low detections" gracefully (VirusTotal 2/70)
- ✅ Provider-reported confidence is valuable signal
- ❌ Assumes providers calibrate confidence similarly

---

#### 4. Median vs Mean for Conflicts

**Decision:** Use median when variance >1500

**Rationale:**
- ✅ Resistant to outliers (one rogue verdict)
- ✅ Better represents "central tendency" in conflicts
- ✅ Prevents single malicious verdict from dominating
- ❌ May miss legitimate outlier threats

---

#### 5. Partial Failure Handling

**Decision:** Proceed normally if ≥2 providers succeed

**Rationale:**
- ✅ System remains operational during partial outages
- ✅ Two independent sources provide reasonable coverage
- ✅ Avoids false "unknown" verdicts
- ❌ May reduce confidence in edge cases

---

## Future Enhancements

### Phase 2: Dynamic Weighting

**Goal:** Machine learning-based provider weight optimization

**Approach:**
```python
# Track historical accuracy per provider
accuracy_metrics = {
    "VirusTotal": {"precision": 0.94, "recall": 0.89},
    "AbuseIPDB": {"precision": 0.87, "recall": 0.92}
}

# Adjust weights based on performance
dynamic_weight = base_weight × (precision + recall) / 2
```

---

### Phase 3: Temporal Decay

**Goal:** Weight recent scans higher than stale data

**Approach:**
```python
age_hours = (now - scan_timestamp).total_seconds() / 3600
decay_factor = exp(-age_hours / 24)  # 24-hour half-life
effective_weight = base_weight × confidence × decay_factor
```

---

### Phase 4: IOC Type-Specific Models

**Goal:** Different scoring logic for IPs vs URLs vs hashes

**Rationale:**
- IP addresses: Reputation changes frequently
- File hashes: Static, high confidence when detected
- URLs: Domain reputation + content analysis

---

### Phase 5: Feedback Loop Integration

**Goal:** Learn from analyst overrides and false positive reports

**Approach:**
```python
# User marks false positive
if analyst_verdict != system_verdict:
    store_feedback(ioc, providers, analyst_verdict)

# Retrain threshold calibration monthly
update_thresholds_from_feedback()
```

---

## Appendix A: Pseudocode Implementation

```python
class ThreatScoringEngine:
    VERDICTS = {
        'malicious': 100,
        'suspicious': 60,
        'unknown': 30,
        'benign': 0
    }

    THRESHOLDS = {
        'benign': (0, 25),
        'suspicious': (26, 65),
        'malicious': (66, 100)
    }

    REPUTATION_MULTIPLIERS = {
        'VirusTotal': 1.2,
        'AbuseIPDB': 1.0,
        'GreyNoise': 1.0,
        'URLScan': 1.0,
        'AlienVault': 0.9
    }

    def calculate_score(self, provider_responses):
        successful = [r for r in provider_responses if r['status'] == 'success']

        # Edge case: No successful providers
        if len(successful) == 0:
            return self._handle_all_failed()

        # Edge case: Single provider
        if len(successful) == 1:
            return self._handle_single_provider(successful[0])

        # Normalize scores
        normalized = []
        weights = []

        for response in successful:
            score = self.VERDICTS[response['verdict']]
            weight = (
                1.0 *  # Base weight
                self.REPUTATION_MULTIPLIERS.get(response['provider'], 1.0) *
                response['confidence']
            )
            normalized.append(score)
            weights.append(weight)

        # Check for conflicting signals
        variance = self._calculate_variance(normalized)
        if variance > 1500:
            final_score = self._median(normalized)
            confidence = self._calculate_confidence(successful) * 0.7
            flags = ['conflicting_signals']
        else:
            weighted_sum = sum(s * w for s, w in zip(normalized, weights))
            total_weight = sum(weights)
            final_score = weighted_sum / total_weight
            confidence = self._calculate_confidence(successful)
            flags = []

        # Map to verdict
        verdict = self._map_score_to_verdict(final_score)

        return {
            'score': round(final_score),
            'verdict': verdict,
            'confidence': round(confidence, 2),
            'flags': flags
        }

    def _map_score_to_verdict(self, score):
        if score <= 25:
            return 'benign'
        elif score <= 65:
            return 'suspicious'
        else:
            return 'malicious'

    def _calculate_confidence(self, responses):
        response_rate = len(responses) / 3  # Assume 3 total providers

        scores = [self.VERDICTS[r['verdict']] for r in responses]
        std_dev = self._std_dev(scores)
        consensus = 1 - (std_dev / 100)

        return (response_rate * 0.6) + (consensus * 0.4)

    def _handle_all_failed(self):
        return {
            'score': 50,
            'verdict': 'unknown',
            'confidence': 0.0,
            'flags': ['all_providers_failed', 'requires_manual_review']
        }

    def _handle_single_provider(self, response):
        score = self.VERDICTS[response['verdict']] * 0.9
        confidence = min(response['confidence'], 0.75)

        return {
            'score': round(score),
            'verdict': self._map_score_to_verdict(score),
            'confidence': confidence,
            'flags': ['single_provider_warning']
        }
```

---

## Appendix B: Validation Test Cases

### Test Suite Requirements

All implementations MUST pass these test cases:

```python
test_cases = [
    {
        "name": "All malicious high confidence",
        "input": [
            {"provider": "VT", "verdict": "malicious", "confidence": 0.9},
            {"provider": "AB", "verdict": "malicious", "confidence": 0.95},
        ],
        "expected": {"verdict": "malicious", "score_range": (90, 100)}
    },
    {
        "name": "All benign high confidence",
        "input": [
            {"provider": "VT", "verdict": "benign", "confidence": 0.85},
            {"provider": "AB", "verdict": "benign", "confidence": 0.90},
        ],
        "expected": {"verdict": "benign", "score_range": (0, 10)}
    },
    {
        "name": "Mixed signals conflict",
        "input": [
            {"provider": "VT", "verdict": "malicious", "confidence": 0.9},
            {"provider": "AB", "verdict": "benign", "confidence": 0.85},
        ],
        "expected": {
            "verdict": "suspicious",
            "flags": ["conflicting_signals"]
        }
    },
    {
        "name": "Single provider only",
        "input": [
            {"provider": "VT", "verdict": "malicious", "confidence": 0.95},
        ],
        "expected": {
            "verdict": "malicious",
            "flags": ["single_provider_warning"],
            "confidence_max": 0.75
        }
    },
    {
        "name": "All timeouts",
        "input": [],
        "expected": {
            "verdict": "unknown",
            "score": 50,
            "confidence": 0.0,
            "flags": ["all_providers_failed"]
        }
    }
]
```

---
