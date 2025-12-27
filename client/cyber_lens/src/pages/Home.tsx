export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">REVEAL THE UNSEEN</h1>
        <p className="hero-subtitle">
          Advanced digital forensics and cybersecurity intelligence at your command.
          Detect anomalies, secure assets, and neutralize threats with precision.
        </p>
        <button className="cta-button">INITIATE SCAN</button>
      </section>

      <section id="features" className="features-container">
        <h2 className="section-title">CORE PROTOCOLS</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">◉</div>
            <h3 className="feature-title">Threat Detection</h3>
            <p className="feature-desc">
              Automated scanning algorithms designed to identify vulnerabilities in real-time.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◈</div>
            <h3 className="feature-title">Data Analysis</h3>
            <p className="feature-desc">
              Deep inspection of binary data and network traffic patterns to uncover hidden risks.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">▣</div>
            <h3 className="feature-title">System Hardening</h3>
            <p className="feature-desc">
              Proactive defense mechanisms to fortify infrastructure against quantum-era attacks.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 CYBER_LENS SYSTEMS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
