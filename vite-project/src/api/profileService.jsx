import api from "./axiosInstance";

export const getAllRequests = () => api.get("/profile");


export const updateRequestStatus = (id, dto) => api.put(`/profile/${id}`, dto);

export const deleteRequest = (id) => api.delete(`/profile/${id}`);