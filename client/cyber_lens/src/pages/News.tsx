import "../styles/News.css";

const News = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Cyber Security News</h2>

      <div className="news-list">
        <div className="news-card">
          <h3>New Phishing Campaign Detected</h3>
          <p>
            Security researchers have identified a new phishing campaign
            targeting email users worldwide.
          </p>
        </div>

        <div className="news-card">
          <h3>Malware Targeting Browsers</h3>
          <p>
            A new malware strain has been reported that exploits browser
            vulnerabilities.
          </p>
        </div>

        <div className="news-card">
          <h3>Zero-Day Vulnerability Disclosed</h3>
          <p>
            A critical zero-day vulnerability has been disclosed in a popular
            software package.
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
