import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("raynott_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    const { data } = await axiosClient.post("/auth/login", { email, password });
    setUser(data);
    localStorage.setItem("raynott_user", JSON.stringify(data));
    localStorage.setItem("raynott_token", data.token);
    setLoading(false);
  };

  const register = async (name, email, password) => {
    setLoading(true);
    const { data } = await axiosClient.post("/auth/register", { name, email, password });
    setUser(data);
    localStorage.setItem("raynott_user", JSON.stringify(data));
    localStorage.setItem("raynott_token", data.token);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("raynott_user");
    localStorage.removeItem("raynott_token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
