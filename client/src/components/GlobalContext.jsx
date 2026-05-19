import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalState({ children }) {



  const [user, setUser] = useState(null);

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