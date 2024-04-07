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

export default function AppChat() {
  // context
  const { currentChat } = useContext(AppContext);

  // chat
  const chat = currentChat ? <Chat id={currentChat} /> : <NoChatSelected />;

  // JSX
  return <div className={css.chat}>{chat}</div>;
}

// components
function Chat({ id }) {
  // data
  const [user, setUser] = useState({});

  // get user from id
  useEffect(() => {
    axois.get("/api/users/" + id).then(({ data }) => setUser(data));
  }, [id]); // id from props

  // JSX
  return (
    <>
      <Header name={user.name} lastseen={user.lastseen} />
      <Messages />
      <Form />
    </>
  );
}

function NoChatSelected() {
  return <p>No chat selected</p>;
}
