import api from "./axiosInstance";

export const getAllTeachers = () => api.get("/teacher");

export const getTeacherById = (id) => api.get(`/teacher/${id}`);

export const createTeacher = (dto) => api.post("/teacher", dto);


export const deleteTeacher = (id) => api.delete(`/teacher/${id}`);