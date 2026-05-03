import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initial state: Try to get role from localStorage, fallback to 'admin'
  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem("zorvyn_user_role");
    return {
      name: "Admin User",
      role: savedRole ? savedRole : "admin" // Default to admin if nothing is saved
    };
  });

  // 2. Persist to localStorage whenever the user object (role) changes
  useEffect(() => {
    localStorage.setItem("zorvyn_user_role", user.role);
  }, [user.role]);

  // 3. Updated toggle logic
  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'admin' ? 'viewer' : 'admin'
    }));
    toast.success(`Switched to ${user.role === 'admin' ? 'viewer' : 'admin'} mode`, { position: "top-right" });
  };

  const isAdmin = user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, toggleRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);