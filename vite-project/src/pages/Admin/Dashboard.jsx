import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllStudents,
  getAllTeachers,
  getAllCourses,
  getAllProfiles,
} from "../../api/dashboardService";

import { RiUserLine } from "react-icons/ri";
import { RiUserStarLine } from "react-icons/ri";
import { RiBookOpenLine } from "react-icons/ri";
import { RiFileListLine } from "react-icons/ri";
import { RiRefreshLine } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";
import {Link} from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const [studentsRes, teachersRes, coursesRes, profilesRes] =
        await Promise.all([
          getAllStudents(),
          getAllTeachers(),
          getAllCourses(),
          getAllProfiles(),
        ]);

      const students = studentsRes.data;
      const teachers = teachersRes.data;
      const courses = coursesRes.data;
      const profiles = profilesRes.data;

      // const pendingRequests = profiles.filter(
      //   (p) => p.status === "Pending",
      // ).length;

      setStats({
        students: students.length,
        teachers: teachers.length,
        courses: courses.length,
        pendingRequests: profiles.length,
      });
    } catch (err) {
      setError("Data is not loading");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      label: "Total Students",
      value: stats.students,
      icon: <RiUserLine className="text-2xl text-blue-600" />,
      iconBg: "bg-blue-100",
      bg: "bg-blue-50",
      border: "border-blue-200",
      valueColor: "text-blue-700",
    },
    { 

      label: "Total Teachers",
      value: stats.teachers,
      icon: <RiUserStarLine className="text-2xl text-green-600" />,
      iconBg: "bg-green-100",
      bg: "bg-green-50",
      border: "border-green-200",
      valueColor: "text-green-700",
    },
    {
      label: "Total Courses",
      value: stats.courses,
      icon: <RiBookOpenLine className="text-2xl text-purple-600" />,
      iconBg: "bg-purple-100",
      bg: "bg-purple-50",
      border: "border-purple-200",
      valueColor: "text-purple-700",
    },
    {
      label: "Pending Requests",
      value: stats.pendingRequests,
      icon: <RiFileListLine className="text-2xl text-orange-600" />,
      iconBg: "bg-orange-100",
      bg: "bg-orange-50",
      border: "border-orange-200",
      valueColor: "text-orange-700",
    },
  ];

  const quickLinks = [
    { label: "Students", path: "/admin/students" },
    { label: "Teachers", path: "/admin/teachers" },
    { label: "Courses", path: "/admin/courses" },
    { label: "Marks", path: "/admin/marks" },
    { label: "Profile Requests", path: "/admin/profile-requests" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <RiDashboardLine className="text-2xl text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Welcome back, {user?.name || "Admin"}!
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                    <div className="h-10 w-10 bg-slate-200 rounded-lg" />
                  </div>
                  <div className="h-8 bg-slate-200 rounded w-16" />
                  <div className="h-3 bg-slate-100 rounded w-12 mt-2" />
                </div>
              ))
          : cards.map((card) => (
              <div
                key={card.label}
                className={`${card.bg} ${card.border} border rounded-xl p-5 hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-600">
                    {card.label}
                  </p>
                  <div className={`${card.iconBg} p-2.5 rounded-lg`}>
                    {card.icon}
                  </div>
                </div>

                <p className={`text-3xl font-bold ${card.valueColor}`}>
                  {card.value}
                </p>

                <p className="text-xs text-slate-400 mt-1">Live count</p>
              </div>
            ))}
      </div>

      

    </div>
  );
};

export default Dashboard;
