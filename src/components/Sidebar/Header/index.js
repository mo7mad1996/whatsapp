"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// axios
import axios from "axios";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

// styles and UI
import css from "../style.module.css";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

// icons
import {
  MdDonutLarge,
  MdOutlineMoreVert,
  MdChat,
  MdSearch,
} from "react-icons/md";

export default function SidebarHeader() {
  // data
  const [search, setSearch] = useState("");
  const [search_result, setSearch_result] = useState([]);

  // context
  const { setCurrentChat } = useContext(AppContext);

  // handel search even
  useEffect(() => {
    if (search) {
      axios
        .post("/api/users/search", { search })
        .then(({ data }) => setSearch_result(data));
    }
  }, [search]);

  // methods
  function startChat(id) {
    axios.post("/api/chats/to", { id }).then(({ data }) => {
      setCurrentChat(data);
    });

    setSearch("");
  }

  return (
    <div className={css.sidebar__header}>
      <h2>All messages</h2>
    </div>
  );
}
