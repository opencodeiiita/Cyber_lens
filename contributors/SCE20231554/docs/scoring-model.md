# Threat Scoring & Verdict Logic Proposal

## 1. Inputs

The system aggregates results from multiple threat intelligence providers. Each input includes:

- **Provider Name:** Name of the threat intelligence source (e.g., VirusTotal, HybridAnalysis, Internal Sandbox).  
- **Provider Confidence / Flags:** Each provider may flag an IOC (Indicator of Compromise) as `benign`, `suspicious`, or `malicious`, often with a numeric confidence score (0–100).  
- **Missing / Failed Responses:** If a provider fails or times out, its result is ignored, but logged for auditing.

---

## 2. Scoring Logic

1. **Provider Contribution:**  
   Each provider contributes a numeric score to the final calculation:  
benign = 0
suspicious = 50
malicious = 100
2. **Weighting Providers:**  
Providers may have different reliability. Example weights:  
VirusTotal: 0.4
HybridAnalysis: 0.3
Internal Sandbox: 0.3

3. **Calculating Final Score:**  
Weighted average formula:  
final_score = (score1weight1 + score2weight2 + ...) / total_weights

4. **Handling Conflicting Results:**  
- If providers disagree, the weighted average balances the influence of each provider.  
- Extreme malicious signals from a highly reliable provider may increase the final score.  

---

## 3. Verdict Thresholds

| Score Range | Verdict       |
|------------|---------------|
| 0 – 20     | Benign        |
| 21 – 70    | Suspicious    |
| 71 – 100   | Malicious     |

---

## 4. Examples

1. **Scenario 1 – All benign**  
- Inputs: `[VirusTotal: benign, HybridAnalysis: benign, Sandbox: benign]`  
- Score: `0`  
- Verdict: **Benign**

2. **Scenario 2 – Mixed results**  
- Inputs: `[VirusTotal: malicious (90), HybridAnalysis: benign (0), Sandbox: suspicious (50)]`  
- Weighted score: `(90*0.4 + 0*0.3 + 50*0.3)/1 = 47`  
- Verdict: **Suspicious**

3. **Scenario 3 – Single provider responds**  
- Inputs: `[VirusTotal: malicious (95), HybridAnalysis: timeout, Sandbox: timeout]`  
- Score: `95`  
- Verdict: **Malicious**

---

## 5. Edge Cases

- **Single Provider Available:** Use its score directly, weight = 1.  
- **All Providers Timeout:** Verdict = `Unknown`, requires human review.  
- **Mixed Signals:** Use weighted average; if variance > 50, flag for review.  

---

### Notes

- Model is **extensible**: new providers can be added with assigned weights.  
- Thresholds and weights can be adjusted based on provider reliability and historical accuracy.  
- Focus is on **clarity, auditability, and logical consistency**.
<!-- Tiny change to trigger PR -->
