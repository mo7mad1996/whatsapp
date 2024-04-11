"use client";
import { useState } from "react";

// icons
import { MdInsertEmoticon, MdMic } from "react-icons/md";

// UI
import IconButton from "@mui/material/IconButton";

// css
import css from "../style.module.css";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

// socket
import { socket } from "~/io";

export default function ChatForm() {
  // data
  const [input, setInput] = useState("");
  const { currentChat, user_id } = useContext(AppContext);

  // methods
  function submit(e) {
    e.preventDefault();

    // create a new message
    const message = {
      message: input,
      from: user_id,
      chat_id: currentChat._id,
    };

    // save this message
    socket.emit("send message", message, currentChat);

    setInput("");
  }

  return (
    <div className={css.chat__footer}>
      <IconButton>
        <MdInsertEmoticon />
      </IconButton>
      <form onSubmit={submit}>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          placeholder="Type a message"
        />
        <button type="submit">Send a message</button>
      </form>
      <IconButton>
        <MdMic />
      </IconButton>
    </div>
  );
}
