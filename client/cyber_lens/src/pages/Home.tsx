import React, { useState } from "react";

const Home: React.FC = () => {
  const [iocValue, setIocValue] = useState("");
  const [iocType, setIocType] = useState("IP");

  const handleSearch = () => {
    console.log(`Searching for ${iocType}: ${iocValue}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#262626_1px,transparent_0)] bg-[size:24px_24px] opacity-20" />

        <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-32 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span>Cyber</span>&nbsp;
            <span className="text-cyan-400">Lens</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-400 mb-14">
            A focused threat intelligence platform for fast IOC inspection,
            contextual verdicts, and analyst-driven decisions.
          </p>

          {/* SEARCH PANEL */}
          <div className="max-w-2xl mx-auto border border-neutral-800 bg-neutral-900">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4">
              <input
                type="text"
                placeholder="Enter IP, domain, URL, or hash"
                value={iocValue}
                onChange={(e) => setIocValue(e.target.value)}
                className="sm:col-span-3 px-4 py-3 bg-neutral-950 border border-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <select
                value={iocType}
                onChange={(e) => setIocType(e.target.value)}
                className="sm:col-span-1 px-3 py-3 bg-neutral-950 border border-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="IP">IP</option>
                <option value="Domain">Domain</option>
                <option value="URL">URL</option>
                <option value="Hash">Hash</option>
              </select>

              <button
                onClick={handleSearch}
                className="sm:col-span-1 px-4 py-3 bg-cyan-500 text-neutral-950 font-semibold hover:bg-cyan-400 transition-colors"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-neutral-800 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-14 text-center">
            Built for real security work
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                IOC-Centric Analysis
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Inspect IPs, domains, URLs, and hashes with contextual metadata
                and historical signals.
              </p>
            </div>

            <div className="border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                Clear Verdict System
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Immediate classification — malicious, suspicious, or clean —
                optimized for fast triage.
              </p>
            </div>

            <div className="border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                Analyst-First UI
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Minimal design, structured data, and layouts that scale from
                laptop to SOC screens.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
