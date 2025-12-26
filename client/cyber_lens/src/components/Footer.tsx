import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {currentYear} Cyber Lens | OpenCode IIIT Allahabad
        </p>
        <div className="footer-links">
          <a href="https://github.com/opencodeiiita/Cyber_lens" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="separator">|</span>
          <a href="https://github.com/opencodeiiita" target="_blank" rel="noopener noreferrer">
            OpenCode
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
