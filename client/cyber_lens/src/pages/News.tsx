import {
  ExternalLink,
  ArrowUpRight,
  Tag,
  ShieldAlert,
  Globe,
  Clock,
} from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "Critical Zero-Day Vulnerability Found in Major cloud Provider",
    summary:
      "A remote code execution (RCE) vulnerability has been discovered in the core infrastructure of a leading cloud services provider. Threat actors are actively exploiting this flaw to deploy crypto-miners and exfiltrate sensitive data. Immediate patching is recommended.",
    source: "CyberWire",
    date: "2025-02-28",
    severity: "Critical",
    tags: ["RCE", "Cloud Security", "CVE-2025-1029"],
    extracted_iocs: 3,
  },
  {
    id: 2,
    title: "New 'DarkCrystal' RAT Campaign Targeting Financial Sectors",
    summary:
      "Security researchers have identified a new phishing campaign distributing the DarkCrystal Remote Access Trojan. The campaign utilizes spoofed tax documents to lure victims into executing malicious macros.",
    source: "The Hacker News",
    date: "2025-02-27",
    severity: "High",
    tags: ["Malware", "Phishing", "RAT"],
    extracted_iocs: 12,
  },
  {
    id: 3,
    title: "Supply Chain Attack Hits Open Source NPM Package",
    summary:
      "A popular NPM package with over 2 million weekly downloads was compromised. The malicious version contains a backdoor that steals environment variables and AWS credentials from CI/CD pipelines.",
    source: "BleepingComputer",
    date: "2025-02-26",
    severity: "High",
    tags: ["Supply Chain", "NPM", "DevSecOps"],
    extracted_iocs: 5,
  },
  {
    id: 4,
    title: "Global Law Enforcement Takedown of 'ShadowHive' Ransomware Group",
    summary:
      "A coordinated effort by Europol and the FBI has led to the seizure of servers belonging to the ShadowHive ransomware gang. Decryption keys for over 500 victims have been released.",
    source: "SecurityWeek",
    date: "2025-02-25",
    severity: "Medium",
    tags: ["Ransomware", "Law Enforcement"],
    extracted_iocs: 0,
  },
  {
    id: 5,
    title: "APT29 Shifts Tactics to target Diplomatic Entities",
    summary:
      "The state-sponsored group APT29 is now using a novel stenography technique to hide C2 communication within innocent-looking image files on public forums.",
    source: "FireEye",
    date: "2025-02-24",
    severity: "Medium",
    tags: ["APT", "Espionage", "Steganography"],
    extracted_iocs: 8,
  },
  {
    id: 6,
    title: "Chrome Release 110 Patches 15 Security Flaws",
    summary:
      "Google has released an urgent update for Chrome to address 15 security vulnerabilities, including three high-severity use-after-free bugs in the rendering engine.",
    source: "Google Blog",
    date: "2025-02-24",
    severity: "Low",
    tags: ["Browser Security", "Patch"],
    extracted_iocs: 0,
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 border-b border-zinc-900 pb-6">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-2">
            Security Briefings
          </h2>
          <p className="text-zinc-500 text-lg">
            Latest threat intelligence updates and extracted IOCs.
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-8 hover:border-zinc-600 transition duration-300">

            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-zinc-800/20 rounded-full blur-3xl group-hover:bg-zinc-700/30 transition-all"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3" />
                    Critical Alert
                  </span>
                  <span className="text-zinc-500 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 2 hours ago
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-zinc-200 transition">
                  {newsData[0].title}
                </h3>

                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  {newsData[0].summary}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-900">
                <div className="flex gap-2">
                  {newsData[0].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-white font-medium hover:text-zinc-300 transition group-hover:translate-x-1 duration-300">
                  Read Full Report <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>


          <div className="space-y-6">
            {newsData.slice(1, 3).map((news) => (
              <div
                key={news.id}
                className="rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 hover:bg-zinc-900/50 transition duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs text-zinc-500 font-mono">
                    {news.source}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded border ${
                      news.severity === "High"
                        ? "border-amber-900/50 text-amber-500 bg-amber-950/20"
                        : "border-zinc-800 text-zinc-500"
                    }`}
                  >
                    {news.severity}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 mb-2 leading-snug hover:text-white cursor-pointer">
                  {news.title}
                </h4>
                <p className="text-sm text-zinc-500 line-clamp-3 mb-4">
                  {news.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-zinc-600">
                  <span>{news.date}</span>
                  {news.extracted_iocs > 0 && (
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Tag className="w-3 h-3" /> {news.extracted_iocs} IOCs
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>


          {newsData.slice(3).map((news) => (
            <div
              key={news.id}
              className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 hover:border-zinc-700 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-3 h-3 text-zinc-600" />
                  <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                    {news.source}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3 hover:underline decoration-zinc-700 underline-offset-4 cursor-pointer">
                  {news.title}
                </h4>
                <p className="text-sm text-zinc-400 mb-4">{news.summary}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-900 mt-2">
                <div className="flex gap-2">
                  <span className="text-xs text-zinc-600">{news.date}</span>
                </div>
                <button className="text-xs font-medium text-white flex items-center gap-1 hover:text-zinc-300">
                  Read <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
