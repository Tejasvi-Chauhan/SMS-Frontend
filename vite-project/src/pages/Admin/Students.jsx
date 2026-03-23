import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { RiDeleteBinLine } from "react-icons/ri";

const Students = () => {

  //  Students list
  const [students, setStudents] = useState([]);

  //  Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rollNumber: "",
    address: "",
    phoneNumber: "",
    dateOfBirth: ""
  });

  //  Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("/student");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  //  Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //  Add student
  const handleSubmit = async () => {
    
    try {
      await axios.post("/student", formData);

      // reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        rollNumber: "",
        address: "",
        phoneNumber: "",
        dateOfBirth: ""
      });

      fetchStudents();
    } catch (err) {
      console.log(err);
      alert("Error adding student");
    }
  };

  //  Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`/student/${id}`);
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-bold">Add Student</h2>

        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 w-full" />

        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />

        <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 w-full" />

        <input name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" className="border p-2 w-full" />

        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full" />

        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="border p-2 w-full" />

        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="border p-2 w-full" />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
    Add Student
  </button>

</form>

      {/* ===== STUDENT TABLE ===== */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Students List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="text-center border-t">
                <td className="p-2">{s.fullName}</td>
                <td>{s.email}</td>
                <td>{s.rollNumber}</td>
                <td>
                  <button
                    onClick={() => handleDelete(s.id)}
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

export default Students;