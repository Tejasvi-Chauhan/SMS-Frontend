import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllMarks } from "../../api/marksService";

const MyMarks = () => {

  const { user } = useAuth();

  const [marks, setMarks] = useState([]);

  // 👉 fetch marks
  const fetchMarks = async () => {
    try {
      const res = await getAllMarks();

      // sirf apne marks
      const myMarks = res.data.filter(
        (m) => m.studentName === user?.name
      );

      setMarks(myMarks);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  // 👉 average
  const avg =
    marks.length > 0
      ? (marks.reduce((a, b) => a + b.marksObtained, 0) / marks.length).toFixed(1)
      : 0;

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">My Marks</h2>

      <p>Total Subjects: {marks.length}</p>
      <p>Average Marks: {avg}</p>

      {/* ===== TABLE ===== */}
      <div className="bg-white p-4 rounded shadow">

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Course</th>
              <th>Teacher</th>
              <th>Marks</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((m) => (
              <tr key={m.id} className="text-center border-t">
                <td>{m.courseName}</td>
                <td>{m.teacherName}</td>
                <td>{m.marksObtained}</td>
                <td>{m.totalMarks}</td>
                <td>{m.grade}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default MyMarks;