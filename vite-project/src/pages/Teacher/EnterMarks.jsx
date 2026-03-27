import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllMarks,
  addMarks,
  updateMarks,
} from "../../api/marksService";
import {
  getAllStudentTeachers,
  getAllTeacherCourses,
} from "../../api/assignmentServices";

const EnterMarks = () => {

  const { user } = useAuth();

  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    marksObtained: "",
    totalMarks: "100",
    grade: ""
  });

  const [editId, setEditId] = useState(null);

  //  fetch data
  const fetchData = async () => {
    try {
      const name = user?.name;

      const [m, s, c] = await Promise.all([
        getAllMarks(),
        getAllStudentTeachers(),
        getAllTeacherCourses()
      ]);

      setMarks(m.data.filter(x => x.teacherName === name));
      setStudents(s.data.filter(x => x.teacherName === name));
      setCourses(c.data.filter(x => x.teacherName === name));

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
      [e.target.name]: e.target.value
    });
  };

  //  add marks
  const handleAdd = async () => {
    try {
      console.log(formData);
      await addMarks({
        studentId: parseInt(formData.studentId),
        courseId: parseInt(formData.courseId),
        teacherId: user?.id || 1,
        marksObtained: parseFloat(formData.marksObtained),
        totalMarks: parseFloat(formData.totalMarks),
        grade: formData.grade,
      });

      setFormData({
        studentId: "",
        courseId: "",
        marksObtained: "",
        totalMarks: "100",
        grade: ""
      });

      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  //  start edit
  const handleEdit = (m) => {
    setEditId(m.id);
    setFormData({
      marksObtained: m.marksObtained,
      totalMarks: m.totalMarks,
      grade: m.grade
    });
  };

  //  update
  const handleUpdate = async () => {
    try {
      await updateMarks(editId, {
        id: editId,
        marksObtained: parseFloat(formData.marksObtained),
        totalMarks: parseFloat(formData.totalMarks),
        grade: formData.grade
      });

      setEditId(null);
      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Enter Marks</h2>

      <div className="bg-white p-4 rounded shadow space-y-3">

        <select name="studentId" value={formData.studentId} onChange={handleChange} className="border p-2 w-full">
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.studentName}</option>
          ))}
        </select>

        <select name="courseId" value={formData.courseId} onChange={handleChange} className="border p-2 w-full">
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.courseName}</option>
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
          className="border p-2 w-full"
        />

        <input
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Grade"
          className="border p-2 w-full"
        />

        <button onClick={handleAdd} className="bg-yellow-500 text-white px-4 py-2">
          Add Marks
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Student</th>
              <th>Course</th>
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

                {editId === m.id ? (
                  <>
                    <td>
                      <input name="marksObtained" value={formData.marksObtained} onChange={handleChange} className="border p-1" />
                    </td>
                    <td>
                      <input name="totalMarks" value={formData.totalMarks} onChange={handleChange} className="border p-1" />
                    </td>
                    <td>
                      <input name="grade" value={formData.grade} onChange={handleChange} className="border p-1" />
                    </td>
                    <td>
                      <button onClick={handleUpdate} className="text-green-600">Save</button>
                      <button onClick={() => setEditId(null)} className="ml-2">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{m.marksObtained}</td>
                    <td>{m.totalMarks}</td>
                    <td>{m.grade}</td>
                    <td>
                      <button onClick={() => handleEdit(m)} className="text-blue-500">
                        Edit
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

export default EnterMarks;