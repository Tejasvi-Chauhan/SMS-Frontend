import { useEffect, useState } from "react";
import {
  getAllStudentTeachers,
  assignTeacherToStudent,
  removeStudentTeacher,
} from "../../api/assignmentServices";
import { getAllStudents } from "../../api/studentService";
import { getAllTeachers } from "../../api/teacherService";
import { RiDeleteBinLine } from "react-icons/ri";

const StudentTeacher = () => {

  //  lists
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  //  form
  const [formData, setFormData] = useState({
    studentId: "",
    teacherId: "",
  });

  //  fetch data
  const fetchData = async () => {
    try {
      const [a, s, t] = await Promise.all([
        getAllStudentTeachers(),
        getAllStudents(),
        getAllTeachers(),
      ]);
      
      setAssignments(a.data);
      setStudents(s.data);
      setTeachers(t.data);
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  assign
  const handleAssign = async () => {
    if (!formData.studentId || !formData.teacherId) {
      alert("Select student and teacher");
      return;
    }

    try {
      await assignTeacherToStudent({
        studentId: parseInt(formData.studentId),
        teacherId: parseInt(formData.teacherId),
      });

      setFormData({ studentId: "", teacherId: "" });

      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  //  delete
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this teacher from student?")) return;

    try {
      await removeStudentTeacher(id);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-bold">Assign Teacher</h2>

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

        <button
          onClick={handleAssign}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Assign
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Student Teachers</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Student</th>
              <th>Teacher</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="text-center border-t">
                <td>{a.studentName}</td>
                <td>{a.teacherName}</td>
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

export default StudentTeacher;