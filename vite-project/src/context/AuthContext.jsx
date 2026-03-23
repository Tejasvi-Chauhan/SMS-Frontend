import { createContext, useContext, useState } from "react";



const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
   
  });

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };



  const isAdmin   = user?.role === "Admin";
  const isTeacher = user?.role === "Teacher";
  const isStudent = user?.role === "Student";



  return (
    <AuthContext.Provider value={{
      user,       
      login,      
      logout,     
      isAdmin,    
      isTeacher,  
      isStudent,  
    }}>
      {children}
      
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;