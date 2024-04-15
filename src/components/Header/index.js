"use client";
// css
import scss from "./style.module.scss";

// icons
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { AiTwotonePlusCircle } from "react-icons/ai";
import Link from "next/link";

import { useState, useEffect } from "react";

// axios
import axios from "axios";

// context
import { useContext } from "react";
import { AppContext } from "~/context";
export default function Header({ css }) {
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
    <div className={scss.relative}>
      <header className={css.Page_header}>
        <IoIosArrowBack className={css.icon} /> <h2>Messages</h2>
        <form className={css.form}>
          <input
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>
            <IoIosSearch />
          </button>
        </form>
        <Link href="/new_message">
          <AiTwotonePlusCircle /> New Message
        </Link>
      </header>

      {search && (
        <ul className={scss.search_result}>
          {search_result.length ? (
            search_result.map((user) => (
              <li key={user._id} onClick={(_) => startChat(user._id)}>
                {user.name}
              </li>
            ))
          ) : (
            <div>No data</div>
          )}
        </ul>
      )}
    </div>
  );
}
