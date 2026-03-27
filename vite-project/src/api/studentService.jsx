import api from "./axiosInstance";


export const getAllStudents = () => api.get("/student");


export const getStudentById = (id) => api.get(`/student/${id}`);


export const createStudent = (dto) => api.post("/student", dto);

export const updateStudent = (id, dto) => api.put(`/student/${id}`, dto);

export const profileUpdate =(studentId,dto)=> api.post(`/profile/${studentId}`,dto);

export const deleteStudent = (id) => api.delete(`/student/${id}`);