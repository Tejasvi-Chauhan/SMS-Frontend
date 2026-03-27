import api from "./axiosInstance";


export const getAllCourses = () => api.get("/course");

export const getCourseById = (id) => api.get(`/course/${id}`);

export const createCourse = (dto) => api.post("/course", dto);


export const deleteCourse = (id) => api.delete(`/course/${id}`);