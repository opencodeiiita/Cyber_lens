// Navbar.tsx
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "History", path: "/history" },
  { name: "News", path: "/news" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const baseLink =
    "relative px-4 py-2 text-base font-medium tracking-wide transition-all duration-200 focus:outline-none focus:text-cyan-400";
  const inactive = "text-slate-400 hover:text-slate-200";
  const active =
    "text-cyan-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cyan-400";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseLink} ${isActive ? active : inactive}`;

  return (
    <nav
      className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800"
      role="navigation"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3">
            <i className="fa-solid fa-lock text-cyan-400 text-xl" />
            <span className="text-xl font-bold text-slate-100">
              Cyber <span className="text-cyan-500">Lens</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-200 focus:outline-none"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"} text-xl`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-slate-800 py-3 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
