import { useState } from "react";

import api from "../../api/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try{
      console.log("Submitting email:", email);
      await api.post("/auth/forgot-password", {
      email: email,
    });
    alert("Check your email");
    }
    catch(err){
      console.log(err);
      alert("Error sending link. Try again.");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6 text-sm">
         
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;