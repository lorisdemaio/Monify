import { useState, useEffect, createContext, useContext } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUserData = () => {
    const stored = localStorage.getItem("utente");
    if (!stored) return;

    const token = JSON.parse(stored);
    const { nome, id, exp } = token;

    try 
    {
        fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning"
            },
            body: JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "success") setUserData({ id, nome, exp, saldo: data.saldo });
        })
    } 
    catch (err) 
    {
      console.error("Errore fetch:", err);
    }
  };

  useEffect(() => {
    if(!token) return;
    fetchUserData();
  }, [token]);

  return(
    <userContext.Provider value={{ userData, refreshSaldo: fetchUserData }}>
        {children}
    </userContext.Provider>
  );
}

export const useUserData = () => useContext(userContext);