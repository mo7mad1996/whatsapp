"use client";

import { useState } from "react";

// css
import css from "../style.module.css";

export default function Messages() {
  const [messages] = useState([]);

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
