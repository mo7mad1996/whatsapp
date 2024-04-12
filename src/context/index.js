"use client";
import { createContext, useState } from "react";

export const AppContext = createContext({});

export function Provider({ children }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [user_id, setUser_id] = useState("");

  const state = {
    // chats
    chats,
    setChats,
    currentChat,
    setCurrentChat,

    // user
    user_id,
    setUser_id,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
