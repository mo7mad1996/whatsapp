"use client";
import { useEffect, useState } from "react";

// css
import css from "./style.module.scss";

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
function Chat({ chat: _id }) {
  // context
  const { user_id } = useContext(AppContext);

  // data
  const [user, setUser] = useState({});
  const [chat, setChat] = useState();

  // ..:: update header ::..
  // get the chat
  useEffect(() => {
    axois.get(`/api/chats/${_id}`).then((res) => setChat(res.data));
  }, [_id]);

  // get user from chat.between
  useEffect(() => {
    if (chat) {
      if (chat.name) return setUser(chat.name);

      const users = chat.between.filter((u) => u._id != user_id);
      if (users.length) setUser(users[0]);
      else setUser({ name: chat.between[0].name + " (You)" });
    }
  }, [chat]); // chat from props

  // join to chat room
  useEffect(() => {
    socket.emit("join", _id);
  }, [_id]);

  // JSX
  return (
    <>
      <Header {...user} />
      <Messages chat={chat} />
      <Form />
    </>
  );
}

function NoChatSelected() {
  return <p>No chat selected</p>;
}
