import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : null
  );

  // Optional: auto-sync with localStorage when authUser changes
  React.useEffect(() => {
    if (authUser) {
      localStorage.setItem("users", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("users");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={[ authUser, setAuthUser ]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
