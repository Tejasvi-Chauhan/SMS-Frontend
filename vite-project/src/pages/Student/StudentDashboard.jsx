import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllStudentCourses, getAllStudentTeachers } from "../../api/assignmentServices";
import { getAllMarks } from "../../api/marksService";

const StudentDashboard = () => {

  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [marks, setMarks] = useState([]);

  //  fetch data
  const fetchData = async () => {
    try {
      const name = user?.name;

      const [c, t, m] = await Promise.all([
        getAllStudentCourses(),
        getAllStudentTeachers(),
        getAllMarks()
      ]);

      // filter for current student
      setCourses(c.data.filter(x => x.studentName === name));
      setTeachers(t.data.filter(x => x.studentName === name));
      setMarks(m.data.filter(x => x.studentName === name));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  average marks
  const avg =
    marks.length > 0
      ? (marks.reduce((a, b) => a + b.marksObtained, 0) / marks.length).toFixed(1)
      : 0;

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Welcome {user?.name}</h2>

    
      <div className="flex gap-4">

        <div className="bg-blue-100 p-4 rounded">
          <p>Courses</p>
          <h2>{courses.length}</h2>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <p>Teachers</p>
          <h2>{teachers.length}</h2>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <p>Marks</p>
          <h2>{marks.length}</h2>
        </div>

        <div className="bg-purple-100 p-4 rounded">
          <p>Average</p>
          <h2>{avg}</h2>
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
        <h3 className="font-bold mb-2">My Teachers</h3>

        {teachers.map((t) => (
          <div key={t.id} className="border p-2 mb-2">
            {t.teacherName}
          </div>
        ))}
      </div>

   
      <div>
        <h3 className="font-bold mb-2">My Marks</h3>

        {marks.map((m) => (
          <div key={m.id} className="border p-2 mb-2">
            {m.courseName} - {m.marksObtained}/{m.totalMarks} ({m.grade})
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentDashboard;