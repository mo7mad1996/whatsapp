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
    <>
      <div className={css.sidebar__header}>
        <Avatar src="https://avatars1.githubusercontent.com/u/54590754?s=460&u=963670b8242d936102baf79974c98a5f27a06041&v=4" />
        <Stack className={css.sidebar__headerRight} direction="row">
          <IconButton>
            <MdDonutLarge />
          </IconButton>
          <IconButton>
            <MdChat />
          </IconButton>
          <IconButton>
            <MdOutlineMoreVert />
          </IconButton>
        </Stack>
      </div>

      <div className={css.sidebar__search}>
        <div className={css.sidebar__search__container}>
          <IconButton>
            <MdSearch />
          </IconButton>

          <input
            placeholder="Search or start new chat"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {search && (
          <ul className={css.search_result}>
            {search_result.map((user) => (
              <li key={user._id} onClick={(_) => startChat(user._id)}>
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
