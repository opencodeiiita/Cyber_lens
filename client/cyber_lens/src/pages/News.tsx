const News = () => {
  return (
    <div className="page-container">
      <h2>Threat Intelligence News</h2>
      <p className="subtitle">
        Latest updates from the cybersecurity ecosystem.
      </p>

      <div className="news-list">
        <div className="card">
          <h4>New Ransomware Variant Observed</h4>
          <p>
            Researchers have identified a new ransomware strain
            targeting small businesses through exposed RDP services.
          </p>
          <small className="meta">Jan 12, 2025 · Malware</small>
        </div>

        <div className="card">
          <h4>Phishing Campaign Targets Cloud Users</h4>
          <p>
            A wave of phishing emails impersonating cloud providers
            has been reported across multiple regions.
          </p>
          <small className="meta">Jan 10, 2025 · Phishing</small>
        </div>
      </div>
    </div>
  );
};

export default News;
