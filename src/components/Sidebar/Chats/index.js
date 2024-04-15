"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

// components
import SidebarChat from "./SidebarChat";

// css
import css from "../style.module.css";

// socket
import { socket } from "~/io";

export default function SidebarChats() {
  // ruter
  const router = useRouter();

  // context
  const { chats, setChats } = useContext(AppContext);

  // data
  const [loading, setLoading] = useState(true);

  // get the chats
  useEffect(() => {
    axios
      .get("/api/chats")
      .then(({ data }) => setChats(data)) // set user chats
      .catch((err) => console.log(err)) // no Auth
      .finally(() => setLoading(false)); // reset loading to false
  }, []);

  useEffect(() => {
    socket.on("new message", (message, id) => {
      setChats((prevChats) => {
        const index = prevChats.findIndex((c) => c._id === id);

        if (index !== -1) {
          const updatedChat = { ...prevChats[index], last_message: message };
          const updatedChats = [
            updatedChat,
            ...prevChats.slice(0, index),
            ...prevChats.slice(index + 1),
          ];
          return updatedChats;
        }

        return prevChats;
      });
    });
  }, []);

  // components
  const ChatsComponent = chats.map((el) => (
    <SidebarChat key={el._id} {...el} chat={el} />
  ));
  const isChats = ChatsComponent.length ? ChatsComponent : <NoChats />;

  // JSX
  return (
    <div className={css.sidebar__chats}>
      <div className={css.chats}>{loading ? <Loading /> : isChats}</div>
    </div>
  );
}

function NoChats() {
  return <p>No chats yet</p>;
}

function Loading() {
  return <h2>Loading</h2>;
}
