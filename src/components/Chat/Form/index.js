"use client";
import { useState } from "react";

// icons
import { MdAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

import { styled } from "@mui/material/styles";

// UI
import IconButton from "@mui/material/IconButton";

// css
import css from "../style.module.scss";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

// socket
import { socket } from "~/io";

// style
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
      chat_id: currentChat,
    };

    // save this message
    if (input.trim()) socket.emit("send message", message, currentChat);

    setInput("");
  }

  // JSX
  return (
    <form onSubmit={submit}>
      <div className={css.edit}>
        <textarea
          value={input}
          onKeyPress={(e) => {
            if (e.key == "Enter" && !e.shiftKey) return submit(e);
          }}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          rows={1}
          placeholder="Type a message"
        />

        <IconButton component="label">
          <MdAttachFile />
          <VisuallyHiddenInput type="file" />
        </IconButton>
      </div>

      <IconButton type="submit">
        <IoMdSend />
      </IconButton>
    </form>
  );
}
