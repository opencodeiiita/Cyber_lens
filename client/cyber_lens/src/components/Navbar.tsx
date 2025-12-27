import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const baseLink =
    "relative px-4 py-2 text-base font-medium tracking-wide transition-colors";
  const inactive = "text-slate-400 hover:text-slate-200";
  const active =
    "text-cyan-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cyan-400";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseLink} ${isActive ? active : inactive}`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-lock text-white text-xl" />
            <span className="text-xl font-bold text-slate-100">
              Cyber <span className="text-cyan-500">Lens</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/history" className={linkClass}>
              History
            </NavLink>
            <NavLink to="/news" className={linkClass}>
              News
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <i
              className={`fa-solid ${open ? "fa-xmark" : "fa-bars"} text-xl`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-slate-800 py-3 flex flex-col">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/history"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              History
            </NavLink>
            <NavLink
              to="/news"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              News
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
