import { useEffect, useState } from "react";
import {
  getAllCourses,
  createCourse,
  deleteCourse,
} from "../../api/courseService";
import { RiDeleteBinLine } from "react-icons/ri";

const Courses = () => {

  const [courses, setCourses] = useState([]);

  //form state
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  // fetch courses
  const fetchCourses = async () => {
    try {
      const res = await getAllCourses();
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  //  add course
  const handleAddCourse = async () => {
    if (!courseName || !courseCode) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createCourse({
        courseName,
        courseCode,
      });

      // reset
      setCourseName("");
      setCourseCode("");

      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  //  delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <form onSubmit={(e)=>{
          e.preventDefault();
          handleAddCourse();
      }} className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-bold">Add Course</h2>

        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          type="Submit"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Courses List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Course Name</th>
              <th>Course Code</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="text-center border-t">
                {console.log(c)}
                <td className="p-2">{c.courseName}</td>
                <td>{c.courseCode}</td>
                <td>
                  <button
                    onClick={() =>   handleDelete(c.id)}
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

export default Courses;