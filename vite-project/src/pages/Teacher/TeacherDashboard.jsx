import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllTeacherCourses,
  getAllStudentTeachers,
} from "../../api/assignmentServices";
import { getAllMarks } from "../../api/marksService";

const TeacherDashboard = () => {

  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);

  //  fetch data
  const fetchData = async () => {
    try {
      const name = user?.name;

      const [c, s, m] = await Promise.all([
        getAllTeacherCourses(),
        getAllStudentTeachers(),
        getAllMarks()
      ]);

      // sirf apne records
      setCourses(c.data.filter(x => x.teacherName === name));
      setStudents(s.data.filter(x => x.teacherName === name));
      setMarks(m.data.filter(x => x.teacherName === name));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Welcome {user?.name}</h2>

      <div className="flex gap-4">

        <div className="bg-blue-100 p-4 rounded">
          <p>Courses</p>
          <h2>{courses.length}</h2>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <p>Students</p>
          <h2>{students.length}</h2>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <p>Marks Given</p>
          <h2>{marks.length}</h2>
        </div>

      </div>

      <div>
        <h3 className="font-bold mb-2">My Courses</h3>

        {courses.map((c) => (
          <div key={c.id} className="border p-2 mb-2">
            {c.courseName} ({c.courseCode})
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-bold mb-2">My Students</h3>

        {students.map((s) => (
          <div key={s.id} className="border p-2 mb-2">
            {s.studentName} ({s.rollNumber})
          </div>
        ))}
      </div>

    </div>
  );
};

export default TeacherDashboard;