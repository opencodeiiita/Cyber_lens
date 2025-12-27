import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md 
        sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <div>
                    <NavLink to="/">
                        <h2 className="text-2xl font-semibold text-blue-600">CyberLens</h2>
                    </NavLink>
                </div>
                <div className="flex gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-blue-600 bg-slate-50 font-medium px-4 py-2 rounded-md transition-all'
                                : 'text-slate-600 font-medium px-4 py-2 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-all'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-blue-600 bg-slate-50 font-medium px-4 py-2 rounded-md transition-all'
                                : 'text-slate-600 font-medium px-4 py-2 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-all'
                        }
                    >
                        History
                    </NavLink>
                    <NavLink
                        to="/news"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-blue-600 bg-slate-50 font-medium px-4 py-2 rounded-md transition-all'
                                : 'text-slate-600 font-medium px-4 py-2 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-all'
                        }
                    >
                        News
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;