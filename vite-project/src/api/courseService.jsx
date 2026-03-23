import api from "./axiosInstance";

// GET /api/course → saare courses
export const getAllCourses = () => api.get("/course");

// GET /api/course/{id} → ek course
export const getCourseById = (id) => api.get(`/course/${id}`);

// POST /api/course → naya course banao
export const createCourse = (dto) => api.post("/course", dto);


export const deleteCourse = (id) => api.delete(`/course/${id}`);