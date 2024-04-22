"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// css
import css from "./style.module.scss";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

// components
import Participants from "./Participants";
import Main_info from "./Main_info";

export default function Info() {
  // context
  const { currentChat } = useContext(AppContext);

  // data
  const [chat, setChat] = useState({});

  // on created
  useEffect(() => {
    axios.get(`/api/chats/${currentChat}`).then((res) => setChat(res.data));
  }, [currentChat]);

  return (
    <aside className={css.info}>
      <Main_info chat={chat} />
      <Participants participants={chat.between} />
    </aside>
  );
}
