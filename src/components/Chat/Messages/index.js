"use client";

import { useState, useEffect } from "react";

// css
import css from "../style.module.css";

// socket
import { socket } from "~/io";

// context
import { AppContext } from "~/context";
import { useContext } from "react";

export default function Messages() {
  // data
  const [messages, updateMessage] = useState([]);
  const { user_id, currentChat } = useContext(AppContext);

  // on create component
  useEffect(() => {
    socket.on("update active chat", (msg) => {
      // create a template
      const newMsg = {
        received: user_id !== msg.from._id,
        message: msg.message,
        createdAt: msg.createdAt,
      };

      updateMessage((prevMessages) => [...prevMessages, newMsg]);
    });
  }, []);

  useEffect(() => {
    updateMessage(
      currentChat.messages.map((msg) => ({
        received: user_id !== msg.from,
        message: msg.message,
        createdAt: msg.createdAt,
      }))
    );
  }, [currentChat]);

  // components
  const MessagesComponent = messages.map((message, i) => (
    <Message key={i} message={message} />
  ));

  return (
    <div className={css.chat__body}>
      <div className={css.chat__content}>{MessagesComponent}</div>
    </div>
  );
}

// ..:: components ::..
function Message({ message }) {
  return (
    <p
      className={`${css.chat__message} ${
        !message.received && css.chat__reciever
      }`}
    >
      <span>{message.message}</span>
      <span className={css.chat__timestamps}>{message.createdAt}</span>
    </p>
  );
}
