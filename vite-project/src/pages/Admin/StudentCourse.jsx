import { useEffect, useState } from "react";
import {
  getAllStudentCourses,
  assignCourseToStudent,
  removeStudentCourse,
} from "../../api/assignmentServices";
import { getAllStudents } from "../../api/studentService";
import { getAllCourses } from "../../api/courseService";
import { RiDeleteBinLine } from "react-icons/ri";

const StudentCourse = () => {

  // 👉 lists
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  // 👉 form state
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
  });

  // 👉 fetch data
  const fetchData = async () => {
    try {
      const [a, s, c] = await Promise.all([
        getAllStudentCourses(),
        getAllStudents(),
        getAllCourses(),
      ]);

      setAssignments(a.data);
      setStudents(s.data);
      setCourses(c.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 👉 handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 👉 assign course
  const handleAssign = async () => {
    if (!formData.studentId || !formData.courseId) {
      alert("Select student and course");
      return;
    }

    try {
      await assignCourseToStudent({
        studentId: parseInt(formData.studentId),
        courseId: parseInt(formData.courseId),
      });

      setFormData({ studentId: "", courseId: "" });

      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  // 👉 delete assignment
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this course from student?")) return;

    try {
      await removeStudentCourse(id);
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

        {/* Student */}
        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.fullName}
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
          className="bg-cyan-500 text-white px-4 py-2 rounded"
        >
          Assign
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Assignments</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Student</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="text-center border-t">
                <td>{a.studentName}</td>
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

export default StudentCourse;