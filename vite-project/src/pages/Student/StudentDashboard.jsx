import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllStudentCourses, getAllStudentTeachers } from "../../api/assignmentServices";
import { getAllMarks } from "../../api/marksService";
import { FaBook } from 'react-icons/fa'; 
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaGraduationCap } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';




const StudentDashboard = () => {

  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);


  //  fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const name = user?.name;

      const [c, t, m] = await Promise.all([
        getAllStudentCourses(),
        getAllStudentTeachers(),
        getAllMarks()
      ]);

      
      setCourses(c.data.filter(x => x.studentName === name));
      setTeachers(t.data.filter(x => x.studentName === name));
      setMarks(m.data.filter(x => x.studentName === name));

    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
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

       const cards = [
      {
        label: "Total Courses",
        value: courses.length,
        icon: <FaBook className="text-2xl text-blue-600" />,
        iconBg: "bg-blue-100",
        bg: "bg-blue-50",
        border: "border-blue-200",
        valueColor: "text-blue-700",
      },
      { 
  
        label: "Total Teachers",
        value: teachers.length,
        icon: <LiaChalkboardTeacherSolid className="text-2xl text-green-600" />,
        iconBg: "bg-green-100",
        bg: "bg-green-50",
        border: "border-green-200",
        valueColor: "text-green-700",
      },
      {
        label: "Total Marks",
        value: marks.length,
        icon: <FaGraduationCap className="text-2xl text-purple-600" />,
        iconBg: "bg-purple-100",
        bg: "bg-purple-50",
        border: "border-purple-200",
        valueColor: "text-purple-700",
      },
      {
        label: "Average Marks",
        value: avg,
        icon: <FaChartBar className="text-2xl text-orange-600" />,
        iconBg: "bg-orange-100",
        bg: "bg-orange-50",
        border: "border-orange-200",
        valueColor: "text-orange-700",
      },
    ];
  

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Welcome {user?.name}!</h2>

    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                    <div className="h-10 w-10 bg-slate-200 rounded-lg" />
                  </div>
                  <div className="h-8 bg-slate-200 rounded w-16" />
                  <div className="h-3 bg-slate-100 rounded w-12 mt-2" />
                </div>
              ))
          : cards.map((card) => (
              <div
                key={card.label}
                className={`${card.bg} ${card.border} border rounded-xl p-5 hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-600">
                    {card.label}
                  </p>
                  <div className={`${card.iconBg} p-2.5 rounded-lg`}>
                    {card.icon}
                  </div>
                </div>

                <p className={`text-3xl font-bold ${card.valueColor}`}>
                  {card.value}
                </p>

                <p className="text-xs text-slate-400 mt-1">Live count</p>
              </div>
            ))}
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