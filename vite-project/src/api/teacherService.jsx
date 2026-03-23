import api from "./axiosInstance";

// GET /api/teacher → saare teachers
export const getAllTeachers = () => api.get("/teacher");

// GET /api/teacher/{id} → ek teacher
export const getTeacherById = (id) => api.get(`/teacher/${id}`);

// POST /api/teacher → naya teacher banao
export const createTeacher = (dto) => api.post("/teacher", dto);


export const deleteTeacher = (id) => api.delete(`/teacher/${id}`);