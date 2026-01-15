import { useEffect, useState } from "react";
import { httpJson } from "../utils/httpClient";

type Row = {
  ioc: string;
  verdict: "Malicious" | "Clean" | "Suspicious" | "";
  timestamp: string;
  note: string;
};

interface HistoryItem {
  id: string;
  owner_type: string;
  owner_id: string;
  ioc_type: string;
  ioc_value: string;
  verdict: string;
  created_at: string;
}

export default function History() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    httpJson<HistoryItem[]>("/history?limit=50")
      .then((items) => {
        const rows: Row[] = items.map((item) => {
          let verdict: Row["verdict"] = "";
          const v = item.verdict?.toLowerCase() || "";
          if (v === "malicious") verdict = "Malicious";
          else if (v === "benign") verdict = "Clean";
          else if (v === "suspicious") verdict = "Suspicious";

          return {
            ioc: item.ioc_value,
            verdict,
            timestamp: new Date(item.created_at).toLocaleString(),
            note: item.ioc_type,
          };
        });
        setData(rows);
      })
      .catch((err) => {
        console.error("Failed to fetch history:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const badgeClass = (v: string) =>
    v === "Malicious"
      ? "bg-red-600/10 text-red-400 ring-red-600/30"
      : v === "Clean"
      ? "bg-emerald-600/10 text-emerald-400 ring-emerald-600/30"
      : v === "Suspicious"
      ? "bg-amber-500/10 text-amber-400 ring-amber-500/30"
      : "bg-neutral-600/10 text-neutral-400 ring-neutral-600/30";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Scan History
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Previously analyzed Indicators of Compromise (IOCs).
            </p>
          </div>

          {/* Search + Export */}
          <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="search"
              placeholder="Search IOC, note…"
              className="w-full sm:w-64 px-3 py-2 text-sm bg-neutral-900 border border-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-cyan-500 text-neutral-950 hover:bg-cyan-400 transition-colors">
              Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-neutral-500">Loading history...</div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-4 md:hidden">
              {data.map((row, idx) => (
                <div
                  key={idx}
                  className="border border-neutral-800 bg-neutral-900 p-4"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="font-mono text-sm text-neutral-100 truncate">
                      {row.ioc}
                    </div>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium ring-1 ${badgeClass(
                        row.verdict
                      )}`}
                    >
                      {row.verdict || "Unknown"}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-neutral-300">{row.note}</div>

                  <div className="mt-3 text-xs text-neutral-400">
                    {row.timestamp}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="overflow-x-auto border border-neutral-700 bg-neutral-950">
                <table className="min-w-full border-collapse text-sm">
                  <thead className="bg-neutral-900 text-neutral-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">IOC</th>
                      <th className="px-4 py-3 text-left font-medium">Verdict</th>
                      <th className="px-4 py-3 text-left font-medium">Type</th>
                      <th className="px-4 py-3 text-right font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-neutral-900/50">
                        <td className="px-4 py-3 font-mono text-neutral-200">
                          {row.ioc}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 text-xs font-medium ring-1 ${badgeClass(
                              row.verdict
                            )}`}
                          >
                            {row.verdict || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-400">{row.note}</td>
                        <td className="px-4 py-3 text-right text-neutral-500">
                          {row.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
