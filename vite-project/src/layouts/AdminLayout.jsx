import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";



const navLinks = [
  { path: "/admin/dashboard",        label: "Dashboard",        icon: <MdDashboard /> },
  { path: "/admin/students",         label: "Students",         icon: <FaUsers /> },
  { path: "/admin/teachers",         label: "Teachers",         icon: <FaChalkboardTeacher /> },
  { path: "/admin/courses",          label: "Courses",          icon: <FaBook /> },
  { path: "/admin/marks",            label: "Marks",            icon: <FaClipboardList /> },
  { path: "/admin/profile-requests", label: "Profile Requests", icon: <FaUserEdit /> },
  { path: "/admin/student-course",   label: "Student Course",   icon: <FaProjectDiagram /> },
  { path: "/admin/student-teacher",  label: "Student Teacher",  icon: <FaProjectDiagram /> },
  { path: "/admin/teacher-course",   label: "Teacher Course",   icon: <FaProjectDiagram /> },
];



const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);


  const navigate  = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    
    <div className="flex h-screen overflow-hidden bg-slate-100">

     
      <aside
        className={`
          flex flex-col bg-slate-800 text-white
          transition-all duration-300 flex-shrink-0
          ${collapsed ? "w-16" : "w-56"}
        `}
      >
       
        <div className="flex items-center justify-between px-3 py-4 border-b border-slate-700">

    
          {!collapsed && (
            <span className="font-bold text-base whitespace-nowrap text-white">
              SMS Admin
            </span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white hover:bg-slate-700 p-1.5 rounded transition-colors ml-auto"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            
            {collapsed ? "▶" : "◀"}
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
                 transition-colors duration-150 no-underline
                 ${isActive
                   ? "bg-blue-600 text-white"
                  
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
                   
                 }`
              }
            >
             
              <span className="text-base flex-shrink-0">{link.icon}</span>

             
              {!collapsed && (
                <span className="whitespace-nowrap">{link.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        
        {!collapsed && (
          <div className="px-3 py-3 border-t border-slate-700">
            <p className="text-xs text-slate-400 truncate">
             
              Logged in as
            </p>
            <p className="text-sm text-white font-medium truncate">
              {user?.name || "Admin"}
            </p>
          </div>
        )}
      </aside>

      
      <div className="flex flex-col flex-1 min-w-0">

       
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 h-15 py-3 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-slate-700">
             
            </span>
          </div>

          <div className="flex items-center gap-3">


            <div className="w-px h-5 bg-slate-200" />

          
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
            >
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

export default AdminLayout;