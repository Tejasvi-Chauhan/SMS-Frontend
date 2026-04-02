import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllTeacherCourses,
  getAllStudentTeachers,
} from "../../api/assignmentServices";
import { getAllMarks } from "../../api/marksService";
import { FaBook } from 'react-icons/fa'; 
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaGraduationCap } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { RiUserLine } from "react-icons/ri";
import { RiUserStarLine } from "react-icons/ri";
import { RiBookOpenLine } from "react-icons/ri";
import { RiFileListLine } from "react-icons/ri";
import { RiRefreshLine } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";

const TeacherDashboard = () => {

  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);


  //  fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
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
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  
        label: "Total Students",
        value: students.length,
        icon: <RiUserLine className="text-2xl text-blue-600" />,
        iconBg: "bg-green-100",
        bg: "bg-green-50",
        border: "border-green-200",
        valueColor: "text-green-700",
      },
      {
        label: "Total Marks Given",
        value: marks.length,
        icon:<FaGraduationCap className="text-2xl text-purple-600" />,
        iconBg: "bg-purple-100",
        bg: "bg-purple-50",
        border: "border-purple-200",
        valueColor: "text-purple-700",
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