"use client";
import { createContext, useState } from "react";

export const AppContext = createContext({});

export function Provider({ children }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();

  return (
    <AppContext.Provider
      value={{ chats, setChats, currentChat, setCurrentChat }}
    >
      {children}
    </AppContext.Provider>
  );
}
