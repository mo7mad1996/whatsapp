"use client";
import { useEffect } from "react";

// axios
import axios from "axios";

// components
import Chat from "~/components/Chat";
import Sidebar from "~/components/Sidebar";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

// socket.io
import { socket } from "~/io";

export default function Home() {
  // context
  const { setUser_id } = useContext(AppContext);

  useEffect(() => {
    axios.get("/api/users/me").then(({ data }) => {
      socket.auth = { user_id: data };
      socket.connect();

      // context user id
      setUser_id(data);
    });
  }, []);

  return (
    <>
      <Sidebar />
      <Chat />
    </>
  );
}
