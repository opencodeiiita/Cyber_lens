import React, { useState } from "react";
import { Search, Shield } from "lucide-react";

export default function Home() {
  const [iocValue, setIocValue] = useState("");
  const [iocType, setIocType] = useState("ip");

  const handleSearch = () => {
    console.log("Searching for:", { iocValue, iocType });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-black text-zinc-300">
      <div className="w-full max-w-2xl my-3">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img
              src="public\cyberlens_bg_removed_logo.png"
              alt=""
              className="w-50 h-50"
            />
          </div>
          <div className="flex justify-center items-center mb-5">
            <img src="public\cyberlens banner.png" alt="" className="w-100" />
          </div>
          <p className="text-lg text-zinc-500">
            Threat Intelligence & IOC Analysis Platform
          </p>
        </div>

        <div className="rounded-3xl p-8 shadow-2xl bg-zinc-950/70 backdrop-blur-md border border-zinc-900/50">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-zinc-400">
              IOC Type
            </label>
            <div className="relative">
              <select
                value={iocType}
                onChange={(e) => setIocType(e.target.value)}
                className="w-full px-4 hover:cursor-pointer py-4 rounded-xl font-medium outline-none transition appearance-none bg-black border border-zinc-800 text-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              >
                <option value="ip">IP Address</option>
                <option value="domain">Domain</option>
                <option value="url">URL</option>
                <option value="hash">File Hash (MD5/SHA1/SHA256)</option>
                <option value="email">Email Address</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-zinc-400">
              IOC Value
            </label>

            <input
              type="text"
              value={iocValue}
              onChange={(e) => setIocValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                iocType === "ip"
                  ? "e.g., 192.168.1.1"
                  : iocType === "domain"
                  ? "e.g., example.com"
                  : iocType === "url"
                  ? "e.g., https://example.com/path"
                  : iocType === "email"
                  ? "e.g., user@example.com"
                  : "e.g., 44d88612fea8a8f36de82e1278abb02f"
              }
              className="w-full px-4 py-4 rounded-xl font-mono outline-none transition bg-black border border-zinc-800 text-white placeholder-zinc-700 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full py-4 rounded-xl hover:cursor-pointer font-bold flex items-center justify-center space-x-2 transition text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 shadow-lg shadow-black/50"
          >
            <Search className="w-5 h-5" />
            <span>Analyze IOC</span>
          </button>

          <p className="text-sm mt-6 text-center text-zinc-600">
            Enter an Indicator of Compromise to analyze using multiple threat
            intelligence sources.
          </p>
        </div>

        <div className="mt-12 text-center text-sm text-zinc-600"></div>
      </div>
    </div>
  );
}
