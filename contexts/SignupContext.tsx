"use client";
import { createContext, useState } from "react";

export const SignupContext = createContext({
  username: "",
  setUsername: (username: string) => {},
});

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");

  return (
    <SignupContext.Provider value={{ username, setUsername }}>
      {children}
    </SignupContext.Provider>
  );
};
