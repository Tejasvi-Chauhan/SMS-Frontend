import api from "./axiosInstance";

export const getAllStudents = () => api.get("/student");

export const getAllTeachers = () => api.get("/teacher");

export const getAllCourses  = () => api.get("/course");


export const getAllProfiles = () => api.get("/profile");