"use client";
import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children, initialSession }) => {
  const [session, setSession] = useState(initialSession);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
