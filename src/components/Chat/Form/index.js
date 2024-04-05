"use client";
import { useState } from "react";

// icons
import { MdInsertEmoticon, MdMic } from "react-icons/md";

// UI
import IconButton from "@mui/material/IconButton";

// css
import css from "../style.module.css";

export default function ChatForm() {
  // data
  const [input, setInput] = useState("");

  // methods
  function submit(e) {
    e.preventDefault();
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
