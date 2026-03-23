import { useEffect, useState } from "react";
import {
  getAllTeacherCourses,
  assignCourseToTeacher,
  removeTeacherCourse,
} from "../../api/assignmentServices";
import { getAllTeachers } from "../../api/teacherService";
import { getAllCourses } from "../../api/courseService";
import { RiDeleteBinLine } from "react-icons/ri";

const TeacherCourse = () => {

  // 👉 lists
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  //  form
  const [formData, setFormData] = useState({
    teacherId: "",
    courseId: "",
  });

  //  fetch data
  const fetchData = async () => {
    try {
      const [a, t, c] = await Promise.all([
        getAllTeacherCourses(),
        getAllTeachers(),
        getAllCourses(),
      ]);

      setAssignments(a.data);
      setTeachers(t.data);
      setCourses(c.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  assign
  const handleAssign = async () => {
    if (!formData.teacherId || !formData.courseId) {
      alert("Select teacher and course");
      return;
    }

    try {
      await assignCourseToTeacher({
        teacherId: parseInt(formData.teacherId),
        courseId: parseInt(formData.courseId),
      });

      setFormData({ teacherId: "", courseId: "" });

      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  // 👉 delete
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this course from teacher?")) return;

    try {
      await removeTeacherCourse(id);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* ===== ASSIGN FORM ===== */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-bold">Assign Course</h2>

        {/* Teacher */}
        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.fullName}
            </option>
          ))}
        </select>

        {/* Course */}
        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseName}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Assign
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Teacher Courses</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Teacher</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="text-center border-t">
                <td>{a.teacherName}</td>
                <td>{a.courseName}</td>
                <td>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TeacherCourse;