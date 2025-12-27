import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        CYBER<span>_LENS</span>
      </div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Home
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          History
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          News
        </NavLink>
      </div>
    </nav>
  );
}
