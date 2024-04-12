import { useState, useEffect } from "react";

// UI
import Avatar from "@mui/material/Avatar";

// css
import css from "./style.module.css";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

export default function SidebarChat({ chat, last_message, between }) {
  // data
  const [name, setName] = useState("");

  // context
  const { setCurrentChat, user_id } = useContext(AppContext);

  // on component created
  useEffect(() => {
    const usersName = between
      .filter((u) => u._id != user_id)
      .map((u) => u.name);

    let chatName = usersName.length ? usersName[0] : between[0].name + " (You)";

    setName(chatName);
  }, []);

  // JSX
  return (
    <div className={css.sidebarChat} onClick={() => setCurrentChat(chat)}>
      <Avatar />

      <div className={css.sidebarChat__info}>
        <h2>{name}</h2>
        <p>{last_message?.message}</p>
      </div>
    </div>
  );
}
