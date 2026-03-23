import api from "./axiosInstance";



export const loginApi = (dto) => {
  return api.post("/auth/login", dto);

};