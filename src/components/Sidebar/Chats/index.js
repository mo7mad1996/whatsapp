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
      .catch(() => router.push("/login")) // no Auth
      .finally(() => setLoading(false)); // reset loading to false
  }, []);

  // components
  const ChatsComponent = chats.map((el) => <SidebarChat key={el._id} />);
  const isChats = ChatsComponent.length ? chats : <NoChats />;

  // JSX
  return (
    <div className={css.sidebar__chats}>{loading ? <Loading /> : isChats}</div>
  );
}

function NoChats() {
  return <p>No chats yet</p>;
}

function Loading() {
  return <h2>Loading</h2>;
}
