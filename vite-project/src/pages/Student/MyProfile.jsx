import api from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const MyProfile = () => {
  const [student, setStudent] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get(`/student/${user?.id}`)
      .then((res) => {
        setStudent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          My Profile
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {student?.fullName}
          </p>
           <p className="text-lg">
            <span className="font-semibold text-gray-700">Branch:</span>{" "}
            {student?.branch}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {student?.email}
          </p>
           <p className="text-lg">
            <span className="font-semibold text-gray-700">RollNumber:</span>{" "}
            {student?.rollNumber}
          </p>
           <p className="text-lg">
            <span className="font-semibold text-gray-700">Phone:</span>{" "}
            {student?.phoneNumber}
          </p>
           <p className="text-lg">
            <span className="font-semibold text-gray-700">Address:</span>{" "}
            {student?.address}
          </p>
          
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
