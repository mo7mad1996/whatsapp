import { useState, useEffect } from "react";

// UI
import Avatar from "@mui/material/Avatar";

// css
import css from "./style.module.css";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

import Moment from "~/moment";

export default function SidebarChat({ chat, last_message, between, _id }) {
  // data
  const [name, setName] = useState("");

  // context
  const { setCurrentChat, currentChat, user_id, setChatinfo } =
    useContext(AppContext);

  // on component created
  useEffect(() => {
    if (between) {
      const usersName = between
        .filter((u) => u._id != user_id)
        .map((u) => u.name);

      let chatName = usersName.length
        ? usersName[0]
        : between[0].name + " (You)";

      setName(chatName);
    }
  }, [between]);

  // JSX
  return (
    <div
      className={`${css.sidebarChat} ${currentChat === _id && css.active}`}
      onClick={() => {
        setCurrentChat(chat._id);

        setChatinfo(false);
      }}
    >
      <Avatar />

      <div className={css.sidebarChat__info}>
        <h2>{name}</h2>
        <p>{last_message?.message}</p>
        <small>
          <Moment date={last_message?.createdAt} format="DD MMM YYYY | LT" />
        </small>
      </div>
    </div>
  );
}
