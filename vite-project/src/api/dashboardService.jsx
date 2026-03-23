import api from "./axiosInstance";

// GET /api/student → saare students
export const getAllStudents = () => api.get("/student");

// GET /api/teacher → saare teachers
export const getAllTeachers = () => api.get("/teacher");

// GET /api/course → saare courses
export const getAllCourses  = () => api.get("/course");

// GET /api/profile → saare profile requests
// Pending wale frontend pe filter karenge
export const getAllProfiles = () => api.get("/profile");