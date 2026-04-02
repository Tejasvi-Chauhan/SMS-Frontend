import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  RiDashboardLine,
  RiMedalLine,
  RiFileListLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiLogoutBoxLine,
  RiUserLine,
} from "react-icons/ri";


const navLinks = [
  { path: "/student/dashboard",        label: "Dashboard",       icon: <RiDashboardLine /> },
  { path: "/student/marks",            label: "My Marks",        icon: <RiMedalLine />     },
  { path: "/student/profile-request",  label: "Profile Request", icon: <RiFileListLine />  },
  { path: "/student/profile",   label: "My Profile",  icon: <RiUserLine />     },
];


const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      <aside className={`flex flex-col bg-violet-900 text-white transition-all duration-300 flex-shrink-0 ${collapsed ? "w-16" : "w-56"}`}>

        <div className="flex items-center justify-between px-3 py-4 border-b border-violet-800">
          {!collapsed && (
            <span className="font-bold text-base whitespace-nowrap text-white">
              SMS Student
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-violet-300 hover:text-white hover:bg-violet-800 p-1.5 rounded transition-colors ml-auto"
          >
            {collapsed
              ? <RiMenuUnfoldLine className="text-lg" />
              : <RiMenuFoldLine className="text-lg" />
            }
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              title={link.label}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                 transition-colors no-underline
                 ${isActive
                   ? "bg-violet-600 text-white"
                   : "text-violet-200 hover:bg-violet-800 hover:text-white"
                 }`
              }
            >
              <span className="text-lg flex-shrink-0">{link.icon}</span>
              {!collapsed && (
                <span className="whitespace-nowrap">{link.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div className="px-3 py-3 border-t border-violet-800">
            <p className="text-xs text-violet-400">Logged in as</p>
            <p className="text-sm text-white font-medium truncate">
              {user?.name || "Student"}
            </p>
          </div>
        )}
      </aside>

      <div className="flex flex-col flex-1 min-w-0">

        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-3 flex-shrink-0 shadow-sm">
          <span className="text-base font-semibold text-slate-700">
            Student Panel
          </span>
          <div className="flex items-center gap-3">
          
            <div className="w-px h-5 bg-slate-200" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
            >
              <RiLogoutBoxLine />
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default StudentLayout;