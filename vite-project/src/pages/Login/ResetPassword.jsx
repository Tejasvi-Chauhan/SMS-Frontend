import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axiosInstance";

function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
         setError("");
         
    if (password.length < 8) {
      setError("Password must be 8 characters long");
      return;
    }

    
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

      await api.post("/auth/reset-password", {
        token:token,
        newPassword: password,
        confirmPassword: confirmPassword,
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Reset Password
      </h2>
       {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
    
      <div className="mb-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

     
      <div className="mb-6">
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Reset Password
      </button>

    </div>
  </div>
);
}

export default ResetPassword;