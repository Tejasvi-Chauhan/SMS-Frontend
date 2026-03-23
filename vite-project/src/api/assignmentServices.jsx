import api from "./axiosInstance";

// ============================================================
// STUDENT COURSE SERVICE
// ============================================================
export const getAllStudentCourses  = ()        => api.get("/studentcourse");
export const assignCourseToStudent = (dto)     => api.post("/studentcourse", dto);
export const removeStudentCourse   = (id)      => api.delete(`/studentcourse/${id}`);

// ============================================================
// STUDENT TEACHER SERVICE
// ============================================================
export const getAllStudentTeachers  = ()        => api.get("/studentteacher");
export const assignTeacherToStudent = (dto)     => api.post("/studentteacher", dto);
export const removeStudentTeacher   = (id)      => api.delete(`/studentteacher/${id}`);


// TEACHER COURSE SERVICE

export const getAllTeacherCourses   = ()        => api.get("/teachercourse");
export const assignCourseToTeacher  = (dto)     => api.post("/teachercourse", dto);
export const removeTeacherCourse    = (id)      => api.delete(`/teachercourse/${id}`);