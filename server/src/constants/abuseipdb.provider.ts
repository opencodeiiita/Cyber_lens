import type { ThreatIntelProvider, IocType } from "./provider.interface";

interface AbuseIPDBResponse {
  data?: {
    ipAddress?: string;
    isPublic?: boolean;
    isWhitelisted?: boolean;
    abuseConfidenceScore?: number;
    countryCode?: string;
    countryName?: string;
    usageType?: string;
    isp?: string;
    isTor?: boolean;
    totalReports?: number;
    lastReportedAt?: string;
  };
}

interface NormalizedResponse {
  provider_name: string;
  verdict: "benign" | "suspicious" | "malicious";
  score: number;
  tags?: string[];
  confidence?: number;
  summary?: string;
}

class AbuseIPDBProvider implements ThreatIntelProvider<NormalizedResponse> {
  readonly name = "abuseipdb";
  readonly supportedIocTypes: ReadonlyArray<IocType> = ["ip"];

  private apiKey = process.env.ABUSEIPDB_API_KEY;
  private baseUrl = process.env.ABUSEIPDB_BASE_URL || "https://api.abuseipdb.com/api/v2/check";
  
  async query(ioc: string, type: IocType, options?: Record<string, unknown> | undefined): Promise<NormalizedResponse> {
    if (type !== "ip") {
      return this.fail("Unsupported IOC type");
    }

    if (!this.apiKey) {
      return this.fail("AbuseIPDB API key not configured");
    }

    try {
      const url = new URL(this.baseUrl);
      url.searchParams.set("ipAddress", ioc);
      url.searchParams.set("maxAgeInDays", "90");
      url.searchParams.set("verbose", "true");

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Key: this.apiKey,
          Accept: "application/json"
        }
      });

      if (!res.ok) {
        return this.fail(`AbuseIPDB API error (${res.status})`);
      }

      const json = (await res.json()) as AbuseIPDBResponse;
      const data = json.data;

      if (!data) {
        return this.fail("Empty response from AbuseIPDB");
      }

      const score = data.abuseConfidenceScore ?? 0;

      const verdict =
        score >= 70
          ? "malicious"
          : score >= 30
          ? "suspicious"
          : "benign";

      const tags: string[] = [];

      if (data.isTor) tags.push("tor");
      if (data.usageType) tags.push(data.usageType.toLowerCase());
      if (data.countryCode) tags.push(`country:${data.countryCode}`);
      if (data.isWhitelisted) tags.push("whitelisted");

      const summaryParts: string[] = [];

      if (data.countryName) summaryParts.push(`Country: ${data.countryName}`);
      if (data.isp) summaryParts.push(`ISP: ${data.isp}`);
      if (typeof data.totalReports === "number") {
        summaryParts.push(`Reports: ${data.totalReports}`);
      }
      if (data.lastReportedAt) {
        summaryParts.push(`Last reported: ${data.lastReportedAt}`);
      }

      return {
        provider_name: this.name,
        verdict,
        score,
        confidence: Math.min(100, score),
        tags: tags.length ? tags : undefined,
        summary: summaryParts.join(" | ")
      };

    } catch {
      return this.fail("AbuseIPDB query failed");
    }
  }

  // ──────────────────────────────────────────────-──-
  // Internal helpers (private, not part of interface)
  // ────────────────────────────────────────────────-─

  private fail(reason: string): NormalizedResponse {
    return {
      provider_name: this.name,
      verdict: "benign",
      score: 0,
      confidence: 0,
      summary: reason,
    };
  }
}

export { AbuseIPDBProvider };