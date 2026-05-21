import { createContext, useState } from "react";
import axios from "axios";

import { useEffect } from "react";
export const GlobalContext = createContext();
const API_URL = import.meta.env.VITE_API_URL
export default function GlobalState({ children }) {


  const [user, setUser] = useState(null);


  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => {
  const { password, __v,...safeUser } = res.data;
  setUser(safeUser);
})
    .catch((err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
    });
}, []);

   











  

  const login = (userData) => {
  const { password, __v, ...safeUser } = userData;
  setUser(safeUser);
};
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