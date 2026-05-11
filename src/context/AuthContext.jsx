import React, { createContext, useState, useContext, } from 'react';
// import { toast } from 'sonner';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initial state: Try to get role from localStorage, fallback to 'admin'
  const [user] = useState(() => {
    const savedRole = localStorage.getItem("edit-u-nm");
    return savedRole ? JSON.parse(savedRole) : { name: "Guest", role: "admin" };
  });


  const isAdmin = user.role === 'admin';

  return (
    <AuthContext.Provider value={{isAdmin, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);