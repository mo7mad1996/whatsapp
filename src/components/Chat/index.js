"use client";
import { useEffect, useState } from "react";

// css
import css from "./style.module.css";

// axios
import axois from "axios";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

// components
import Header from "./Header";
import Messages from "./Messages";
import Form from "./Form";

// socket
import { socket } from "~/io";

export default function AppChat() {
  // context
  const { currentChat } = useContext(AppContext);

  // chat
  const chat = currentChat ? <Chat chat={currentChat} /> : <NoChatSelected />;

  // JSX
  return <div className={css.chat}>{chat}</div>;
}

// ..:: small components ::..
function Chat({ chat }) {
  // data
  const [user, setUser] = useState({});
  const { user_id } = useContext(AppContext);

  // update header
  // get user from chat.between
  useEffect(() => {
    const users = chat.between.filter((u) => u._id != user_id);

    if (users.length) setUser(users[0]);
    else setUser({ name: chat.between[0].name + " (You)" });
  }, [chat]); // chat from props

  useEffect(() => {
    // join to chat room
    socket.emit("join", chat._id);
  }, [chat]);

  // JSX
  return (
    <>
      <Header {...user} />
      <Messages />
      <Form />
    </>
  );
}

function NoChatSelected() {
  return <p>No chat selected</p>;
}
