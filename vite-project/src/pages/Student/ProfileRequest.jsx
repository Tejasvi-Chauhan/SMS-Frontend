import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllRequests } from "../../api/profileService";
import api from "../../api/axiosInstance";

const ProfileRequest = () => {

  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    fieldName: "",
    oldValue: "",
    newValue: ""
  });

  // 👉 fetch requests
  const fetchRequests = async () => {
    try {
      const res = await getAllRequests();
      const myName = user?.name;

      // sirf apni requests
      const myData = res.data.filter(r => r.fullName === myName);

      setRequests(myData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 👉 change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 👉 submit request
  const handleSubmit = async () => {
    if (!formData.fieldName || !formData.newValue) {
      alert("Fill required fields");
      return;
    }

    try {
      await api.post("/profile", formData);

      // reset
      setFormData({
        fieldName: "",
        oldValue: "",
        newValue: ""
      });

      fetchRequests();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Profile Requests</h2>

      {/* ===== FORM ===== */}
      <div className="bg-white p-4 rounded shadow space-y-3">

        <select
          name="fieldName"
          value={formData.fieldName}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Field</option>
          <option value="FullName">Full Name</option>
          <option value="Email">Email</option>
          <option value="PhoneNumber">Phone</option>
          <option value="Address">Address</option>
        </select>

        <input
          name="oldValue"
          value={formData.oldValue}
          onChange={handleChange}
          placeholder="Old Value (optional)"
          className="border p-2 w-full"
        />

        <input
          name="newValue"
          value={formData.newValue}
          onChange={handleChange}
          placeholder="New Value"
          className="border p-2 w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Submit Request
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">My Requests</h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Field</th>
              <th>Old</th>
              <th>New</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="text-center border-t">
                <td>{r.fieldName}</td>
                <td>{r.oldValue}</td>
                <td>{r.newValue}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ProfileRequest;