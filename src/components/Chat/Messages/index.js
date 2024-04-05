"use client";

import { useState } from "react";

// css
import css from "../style.module.css";

export default function Messages() {
  const [messages] = useState([
    { received: false, name: "Ali1", createdAt: "app" },
    { received: true, name: "Ali2", createdAt: "app" },
    { received: false, name: "Ali", createdAt: "app" },
    { received: false, name: "Ali", createdAt: "app" },
  ]);

  // components
  const MessagesComponent = messages.map((message, i) => (
    <Message key={i} message={message} />
  ));

  return <div className={css.chat__body}>{MessagesComponent}</div>;
}

// ..:: components ::..
function Message({ message }) {
  return (
    <p
      className={`${css.chat__message} ${
        message.received && css.chat__reciever
      }`}
    >
      <span className={css.chat__name}>{message.name}</span>
      {message.message}
      <span className={css.chat__timestamp}>{message.createdAt}</span>
    </p>
  );
}
