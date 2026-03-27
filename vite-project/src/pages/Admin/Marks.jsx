import { useEffect, useState } from "react";
import {
  getAllMarks,
  addMarks,
  updateMarks,
  deleteMarks,
} from "../../api/marksService";
import { getAllStudents } from "../../api/studentService";
import { getAllTeachers } from "../../api/teacherService";
import { getAllCourses } from "../../api/courseService";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    teacherId: "",
    marksObtained: "",
    totalMarks: "100",
    grade: "",
  });

  //  edit state
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    marksObtained: "",
    totalMarks: "",
    grade: "",
  });

  //  fetch
  const fetchData = async () => {
    try {
      const [m, s, t, c] = await Promise.all([
        getAllMarks(),

        getAllStudents(),
        getAllTeachers(),
        getAllCourses(),
      ]);

      setMarks(m.data);
      setStudents(s.data);
      setTeachers(t.data);
      setCourses(c.data);

      console.log(m.data);
      console.log(s.data);
      console.log(t.data);
      console.log(c.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  handle add change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  handle edit change
  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  //  add marks
  const handleAdd = async () => {
    try {
      console.log(formData)
      await addMarks({
        studentId: parseInt(formData.studentId),
        courseId: parseInt(formData.courseId),
        teacherId: parseInt(formData.teacherId),
        marksObtained: parseFloat(formData.marksObtained),
        totalMarks: parseFloat(formData.totalMarks),
        grade: formData.grade,
      });

      setFormData({
        studentId: "",
        courseId: "",
        teacherId: "",
        marksObtained: "",
        totalMarks: "100",
        grade: "",
      });

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  //  start edit
  const handleEdit = (m) => {
    setEditId(m.id);
    console.log(m);
    setEditData({
      marksObtained: m.marksObtained,
      totalMarks: m.totalMarks,
      grade: m.grade,
    });
  };

  //  update marks
  const handleUpdate = async () => {
    try {
      console.log(editData);
      if (!editData.marksObtained || !editData.totalMarks) {
        alert("Marks and Total Marks are required");
        return;
      }

      setUpdating(true);

      await updateMarks(editId, {
        id: editId,
        marksObtained: parseFloat(editData.marksObtained),
        totalMarks: parseFloat(editData.totalMarks),
        grade: editData.grade,
      });

      alert("Marks updated successfully");

      setEditId(null);
      fetchData();
    } catch (err) {
     
      const message = err.response?.data?.message || "Update failed ";

      alert(message);
    } finally {
      setUpdating(false);
    }
  };

  //  delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await deleteMarks(id);
    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-bold">Add Marks</h2>

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.fullName}
            </option>
          ))}
        </select>

        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseName}
            </option>
          ))}
        </select>

        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.fullName}
            </option>
          ))}
        </select>

        <input
          name="marksObtained"
          value={formData.marksObtained}
          onChange={handleChange}
          placeholder="Marks"
          className="border p-2 w-full"
        />

        <input
          name="totalMarks"
          value={formData.totalMarks}
          onChange={handleChange}
          placeholder="Total Marks"
          className="border p-2 w-full"
        />

        <input
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Grade"
          className="border p-2 w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Marks
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Student</th>
              <th>Course</th>
              <th>Teacher</th>
              <th>Marks</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((m) => (
              <tr key={m.id} className="text-center border-t">
                <td>{m.studentName}</td>
                <td>{m.courseName}</td>
                <td>{m.teacherName}</td>

                {editId === m.id ? (
                  <>
                    <td>
                      <input
                        name="marksObtained"
                        value={editData.marksObtained}
                        onChange={handleEditChange}
                        className="border p-1"
                      />
                    </td>
                    <td>
                      <input
                        name="totalMarks"
                        value={editData.totalMarks}
                        onChange={handleEditChange}
                        className="border p-1"
                      />
                    </td>
                    <td>
                      <input
                        name="grade"
                        value={editData.grade}
                        onChange={handleEditChange}
                        className="border p-1"
                      />
                    </td>
                    <td>
                      <button
                        onClick={handleUpdate}
                        disabled={updating}
                        className="text-green-600 disabled:opacity-50"
                      >
                        {updating ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="ml-2 text-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{m.marksObtained}</td>
                    <td>{m.totalMarks}</td>
                    <td>{m.grade}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(m)}
                        className="text-blue-500"
                      >
                        <RiEditLine />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="text-red-500 ml-2"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
