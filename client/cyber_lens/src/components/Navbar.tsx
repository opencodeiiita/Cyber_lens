import { Shield } from "lucide-react";
import { NavLink } from "react-router-dom";


const linkBase =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-zinc-900 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">

            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white shadow-inner">

              <img src="public\cyberlens_bg_removed_logo.png" alt="" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-white">Cyber Lens</div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  linkBase,
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                ].join(" ")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                [
                  linkBase,
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                ].join(" ")
              }
            >
              History
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                [
                  linkBase,
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                ].join(" ")
              }
            >
              News
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
