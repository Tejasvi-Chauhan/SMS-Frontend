import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import Students from "../pages/Admin/Students";
import LoginPage from "../pages/Login/LoginPage";
import Dashboard from "../pages/Admin/Dashboard";
import Marks from "../pages/Admin/Marks";
import StudentCourse from "../pages/Admin/StudentCourse";
import StudentTeacher from "../pages/Admin/StudentTeacher";
import TeacherCourse from "../pages/Admin/TeacherCourse";
import MyMarks from "../pages/Student/MyMarks";
import ProfileRequest from "../pages/Student/ProfileRequest";
import ProfileRequests from "../pages/Admin/ProfileRequests";
import AdminLayout from "../layouts/AdminLayout";
import Teachers from "../pages/Admin/Teachers";
import Courses from "../pages/Admin/Courses";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import EnterMarks from "../pages/Teacher/EnterMarks";
import StudentDashboard from "../pages/Student/StudentDashboard";
import StudentLayout from "../layouts/StudentLayout";




const RootRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "Admin") return <Navigate to="/admin/Layout" />;
  if (user.role === "Teacher") return <Navigate to="/teacher/Layout" />;
  if (user.role === "Student") return <Navigate to="/student/Layout" />;

  return <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/unauthorized"
        element={
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Access Denied</h2>
            <p>You don't have access of this page.</p>
            <Link to="/login">Back to login</Link>
          </div>
        }
      />

      {/* ADMIN */}
     <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard"        element={<Dashboard/>} />
          <Route path="/admin/students"         element={<Students/>} />
          <Route path="/admin/teachers"         element={<Teachers />} />
          <Route path="/admin/courses"          element={<Courses />} />
          <Route path="/admin/marks"            element={<Marks/>} />
          <Route path="/admin/profile-requests" element={<ProfileRequests />} />
          <Route path="/admin/student-course"   element={<StudentCourse/>} />
          <Route path="/admin/student-teacher"  element={<StudentTeacher/>} />
          <Route path="/admin/teacher-course"   element={<TeacherCourse/>} />
        </Route>
      </Route>

      {/* TEACHER */}
      <Route element={<ProtectedRoute allowedRoles={["Teacher"]} />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/marks"     element={<EnterMarks />} />
      </Route>

      {/*  STUDENT */}
      <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
         <Route path="/student/marks"           element={<MyMarks/>} />
          <Route path="/student/profile-request" element={<ProfileRequest />} />
          <Route path="/student/Layout" element={<StudentLayout />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>404 — Page not found</h2>
            <Link to="/">Back to Home Page</Link>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRouter;