import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Cyber Lens
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/history" className="hover:text-gray-300">
              History
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-gray-300">
              News
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
