import { useState } from "react";

type NewsItem = {
  title: string;
  summary: string;
  category?: "Threat" | "Vulnerability" | "Advisory";
};

export default function News() {
  const [query, setQuery] = useState("");

  const newsItems: NewsItem[] = [
    {
      title: "New Ransomware Campaign Targets Indian Enterprises",
      summary:
        "Security researchers report a surge in ransomware operations targeting mid-size Indian enterprises through phishing and exposed services.",
      category: "Threat",
    },
    {
      title: "Zero-Day Vulnerability Found in Popular Web Framework",
      summary:
        "A critical zero-day vulnerability allows remote code execution. Active exploitation has been observed in the wild.",
      category: "Vulnerability",
    },
    {
      title: "Threat Actors Exploit Misconfigured Cloud Buckets",
      summary:
        "Public cloud storage misconfigurations continue to leak sensitive data at scale across industries.",
      category: "Advisory",
    },
  ];

  const categoryStyle = (cat?: string) =>
    cat === "Threat"
      ? "bg-red-600/10 text-red-400 ring-red-600/30"
      : cat === "Vulnerability"
      ? "bg-amber-500/10 text-amber-400 ring-amber-500/30"
      : "bg-cyan-500/10 text-cyan-400 ring-cyan-500/30";

  const filteredNews = newsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header + Search */}
        <header className="mb-8 border-b border-neutral-800 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Cyber Threat News
              </h1>
              <p className="text-sm text-neutral-400 mt-2">
                Structured security bulletins and intelligence updates
              </p>
            </div>

            {/* Search Filter */}
            <div className="w-full sm:w-80">
              <div className="flex">
                <input
                  type="search"
                  placeholder="Search news…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-neutral-900 border border-neutral-800 border-r-0 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button className="px-4 ml-2 py-2 text-sm font-medium bg-cyan-500 text-neutral-950 hover:bg-cyan-400 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* News Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.map((item, idx) => (
            <article
              key={idx}
              className="relative flex flex-col border border-neutral-800 bg-neutral-900 hover:bg-neutral-800/70 transition-colors"
            >
              {/* Severity bar */}
              <div className="h-1 w-full bg-neutral-800">
                <div
                  className={`h-full ${
                    item.category === "Threat"
                      ? "bg-red-500"
                      : item.category === "Vulnerability"
                      ? "bg-amber-500"
                      : "bg-cyan-500"
                  }`}
                />
              </div>

              <div className="flex flex-col flex-1 p-4">
                {/* Meta */}
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ring-1 ${categoryStyle(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-neutral-500">Intelligence</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-4">
                  {item.summary}
                </p>

                {/* Action */}
                <div className="mt-auto pt-4 text-sm font-medium text-cyan-400 hover:underline cursor-pointer">
                  View details →
                </div>
              </div>
            </article>
          ))}

          {filteredNews.length === 0 && (
            <div className="col-span-full text-center text-sm text-neutral-500 py-12">
              No news items match your search.
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-8 text-xs text-neutral-500">
          All updates follow a unified bulletin format for consistent analyst
          review.
        </div>
      </div>
    </div>
  );
}
