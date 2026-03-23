import api from "./axiosInstance";

// GET /api/profile → saare profile requests
export const getAllRequests = () => api.get("/profile");


export const updateRequestStatus = (id, dto) => api.put(`/profile/${id}`, dto);

// DELETE /api/profile/{id} → request delete karo
export const deleteRequest = (id) => api.delete(`/profile/${id}`);