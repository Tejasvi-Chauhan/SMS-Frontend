import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginApi } from "../../api/authService";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginApi(formData);
      const { token } = response.data;

      const payload = JSON.parse(atob(token.split(".")[1]));

      const userData = {
        name:
          payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
          "",
        role:
          payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
          "",
      };

      login(token, userData);

      if (userData.role === "Admin") navigate("/admin/dashboard");
      else if (userData.role === "Teacher") navigate("/teacher/dashboard");
      else if (userData.role === "Student") navigate("/student/dashboard");
      else setError("Invalid role. Please contact admin.");
    } catch (err) {
  if (err.response?.status === 400 && err.response.data?.errors) {
    const errors = err.response.data.errors;

    // Password validation
    if (errors.Password) {
      setError(errors.Password[0]);
    }
    // Email validation
    else if (errors.Email) {
      setError(errors.Email[0]);
    }
    else {
      setError("Validation error");
    }

  } else if (err.response?.status === 401) {
    setError("Invalid email or password.");
  }   else if (typeof err.response?.data === "string") {
    setError(err.response.data);
  
  } else {
    setError("Server is not connected.");
  }
} finally {
  setLoading(false);
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Management System
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
         
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;