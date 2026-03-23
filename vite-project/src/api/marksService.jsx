import api from "./axiosInstance";

export const getAllMarks = () => api.get("/marks");


export const addMarks = (dto) => api.post("/marks", dto);


export const updateMarks = (id, dto) => api.put(`/marks/${id}`, dto);


export const deleteMarks = (id) => api.delete(`/marks/${id}`);