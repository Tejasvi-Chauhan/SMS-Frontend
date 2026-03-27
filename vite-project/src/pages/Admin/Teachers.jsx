import { useState, useEffect } from "react";
import { getAllTeachers, createTeacher, deleteTeacher } from "../../api/teacherService";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

const Teachers = () => {

  //  simple states
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");

  //  fetch teachers
  const fetchTeachers = async () => {
    try {
      const res = await getAllTeachers();
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  //  add teacher
  const handleAddTeacher = async () => {
    if (!name || !email || !password || !phone || !qualification) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await createTeacher({
        fullName: name,
        email: email,
        password: password,
        department: department,
        phoneNumber: phone,
        qualification: qualification,
      });

      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setDepartment("");
      setPhone("");
      setQualification("");

      fetchTeachers();
    } catch (err) {
      console.log(err);
    }
  };

  //  delete teacher
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <form onSubmit={(e)=>{
        e.preventDefault();
        handleAddTeacher();
      }} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <h2 className="text-xl font-bold">Add Teacher</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 flex items-center gap-2"
        >
          <RiAddLine />
          Add Teacher
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Teachers List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="text-center border-t">
                <td className="p-2">{t.fullName}</td>
                <td>{t.email}</td>
                <td>{t.department}</td>
                <td>{t.phoneNumber}</td>
                <td>{t.qualification}</td>
                <td>
                  <button
                    onClick={() => handleDelete(t.id)}
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

export default Teachers;