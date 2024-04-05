"use client";

import { useState } from "react";

// components
import SidebarChat from "./SidebarChat";

// css
import css from "../style.module.css";

export default function SidebarChats() {
  const [chats, setChats] = useState([{ _id: "1", name: "John Doe" }]);

  // components
  const ChatsComponent = chats.map((el) => <SidebarChat key={el._id} />);

  return <div className={css.sidebar__chats}>{ChatsComponent}</div>;
}
