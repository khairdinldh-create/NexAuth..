import { createContext, useState } from "react";
import axios from "axios";

import { useEffect } from "react";
export const GlobalContext = createContext();

export default function GlobalState({ children }) {


  const [user, setUser] = useState(null);


  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  axios.get('http://localhost:8000/user', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => setUser(res.data))
    .catch((err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
    });
}, []);

   











  

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };


  

  return (
    <GlobalContext.Provider value={{ user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}