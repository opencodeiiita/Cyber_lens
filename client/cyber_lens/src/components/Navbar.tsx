import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Cyber Lens
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/history" 
              className={`navbar-link ${location.pathname === '/history' ? 'active' : ''}`}
            >
              History
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/news" 
              className={`navbar-link ${location.pathname === '/news' ? 'active' : ''}`}
            >
              News
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
