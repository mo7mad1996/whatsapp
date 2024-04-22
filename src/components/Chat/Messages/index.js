"use client";

import { useState, useEffect } from "react";

// css
import css from "../style.module.scss";

// socket
import { socket } from "~/io";

// context
import { AppContext } from "~/context";
import { useContext } from "react";

// ui
import Avatar from "@mui/material/Avatar";

// Moment
import Moment from "~/moment";

export default function Messages({ chat }) {
  // data
  const [messages, updateMessage] = useState([]);
  const { user_id } = useContext(AppContext);

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
    if (chat) {
      updateMessage(
        chat.messages.map((msg) => ({
          received: user_id !== msg.from,
          message: msg.message,
          createdAt: msg.createdAt,
        }))
      );
    }
  }, [chat]);

  // components
  const MessagesComponent = messages.map((message, i) => (
    <Message key={i} message={message} />
  ));

  return (
    <div className={css.chat__body}>
      <div>{MessagesComponent}</div>
    </div>
  );
}

// ..:: components ::..
function Message({ message }) {
  return (
    <div
      className={`${css.chat__message} ${
        message.received && css.chat__reciever
      }`}
    >
      <Avatar />

      <div className={css.details}>
        <p>{message.message}</p>
        <span className={css.chat__timestamps}>
          <Moment date={message.createdAt} format="LT" />
        </span>
      </div>
    </div>
  );
}
