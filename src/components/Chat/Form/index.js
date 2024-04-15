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
  const { currentChat, user_id, setChats, chats } = useContext(AppContext);

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
    if (input.trim())
      socket.emit("send message", message, currentChat, (message, id) => {
        setChats((prevChats) => {
          const index = prevChats.findIndex((c) => c._id === id);

          if (index !== -1) {
            const updatedChat = { ...prevChats[index], last_message: message };
            const updatedChats = [
              updatedChat,
              ...prevChats.slice(0, index),
              ...prevChats.slice(index + 1),
            ];
            return updatedChats;
          }
        });
      });

    setInput("");
  }

  // JSX
  return (
    <form onSubmit={submit}>
      <div className={css.edit}>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
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
