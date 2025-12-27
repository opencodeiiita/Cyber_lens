import {
  Search,
  Clock,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  FileText,
  Trash2,
  Filter,
} from "lucide-react";

const historyData = [
  {
    id: 1,
    ioc: "192.168.45.12",
    type: "IP",
    verdict: "Malicious",
    timestamp: "2025-02-28 14:32:01",
    note: "Associated with Cobalt Strike beacon",
  },
  {
    id: 2,
    ioc: "example-update-login.com",
    type: "Domain",
    verdict: "Suspicious",
    timestamp: "2025-02-28 12:15:00",
    note: "Newly registered domain (NRD)",
  },
  {
    id: 3,
    ioc: "44d88612fea8a8f36de82e1278abb02f",
    type: "Hash",
    verdict: "Clean",
    timestamp: "2025-02-27 09:45:12",
    note: "Standard system file",
  },
  {
    id: 4,
    ioc: "http://malware-dump.xyz/payload.exe",
    type: "URL",
    verdict: "Malicious",
    timestamp: "2025-02-26 18:20:33",
    note: "Direct download link detected",
  },
  {
    id: 5,
    ioc: "10.0.0.55",
    type: "IP",
    verdict: "Unknown",
    timestamp: "2025-02-25 11:10:05",
    note: "-",
  },
];

const VerdictBadge = ({ verdict }) => {
  const styles = {
    Malicious: "bg-red-950/30 text-red-500 border-red-900/50",
    Suspicious: "bg-amber-950/30 text-amber-500 border-amber-900/50",
    Clean: "bg-emerald-950/30 text-emerald-500 border-emerald-900/50",
    Unknown: "bg-zinc-900 text-zinc-400 border-zinc-800",
  };

  const icons = {
    Malicious: <AlertCircle className="w-3 h-3" />,
    Suspicious: <HelpCircle className="w-3 h-3" />,
    Clean: <CheckCircle className="w-3 h-3" />,
    Unknown: <HelpCircle className="w-3 h-3" />,
  };

  const style = styles[verdict] || styles.Unknown;
  const icon = icons[verdict] || icons.Unknown;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${style}`}
    >
      {icon}
      {verdict}
    </span>
  );
};

const History = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Analysis History
            </h2>
            <p className="text-zinc-500 mt-1">
              Recent IOC lookups and threat intelligence verdicts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-red-400 hover:bg-red-950/20 hover:border-red-900/50 transition">
              <Trash2 className="w-4 h-4" />
              Clear Log
            </button>
          </div>
        </div>


        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-600" />
          </div>
          <input
            type="text"
            placeholder="Search history for IOCs, hashes, or tags..."
            className="w-full pl-10 pr-4 py-3 bg-zinc-950/50 border border-zinc-900 rounded-xl text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition"
          />
        </div>


        <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-950/80">
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    IOC Detail
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Verdict
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Timestamp
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Note
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60">
                {historyData.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-zinc-900/30 transition duration-150 ease-in-out"
                  >

                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm text-zinc-200 group-hover:text-white transition-colors">
                          {item.ioc}
                        </span>
                        <span className="text-xs text-zinc-600 uppercase mt-0.5">
                          {item.type}
                        </span>
                      </div>
                    </td>


                    <td className="py-4 px-6">
                      <VerdictBadge verdict={item.verdict} />
                    </td>


                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {item.timestamp}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-400 max-w-[200px] truncate">
                        <FileText className="w-3.5 h-3.5 text-zinc-700" />
                        {item.note}
                      </div>
                    </td>


                    <td className="py-4 px-6 text-right">
                      <button className="text-zinc-600 hover:text-white transition">
                        <span className="text-xs font-medium">View Report</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="py-4 px-6 border-t border-zinc-900 bg-zinc-950/50 flex justify-between items-center">
            <span className="text-xs text-zinc-600">
              Showing 5 of 128 entries
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs rounded border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white transition disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 text-xs rounded border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
