import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home |
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        History |
      </NavLink>
      <NavLink
        to="/news"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        News
      </NavLink>
    </div>
  );
};

export default Navbar;
