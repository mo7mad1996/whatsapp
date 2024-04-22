// css
import css from "./style.module.scss";
import scss from "~/components/Header/style.module.scss";

// icons
import { IoIosSearch } from "react-icons/io";

// react
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { Avatar } from "@mui/material";

export default function People({ to, setTo }) {
  // data
  const [search, setSearch] = useState("");
  const [search_result, setSearch_result] = useState([]);
  const input = useRef(null);

  // handel search even
  useEffect(() => {
    if (search) {
      axios
        .post("/api/users/search", { search })
        .then(({ data }) => setSearch_result(data));
    }
  }, [search]);

  // methods
  function add(user) {
    setTo((a) =>
      [...new Set(a.concat(user).map((o) => JSON.stringify(o)))].map((s) =>
        JSON.parse(s)
      )
    );

    setSearch("");
    input.current.focus();
  }

  // components
  const people = to.map((el) => <li key={el._id}>{el.name}</li>);

  return (
    <div className={scss.relative}>
      <div className={css.search}>
        <ul>{people}</ul>
        <input
          placeholder="new Person"
          value={search}
          autoFocus
          ref={input}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>
          <IoIosSearch />
        </button>
      </div>

      {search && (
        <ul className={scss.search_result}>
          {search_result.length ? (
            search_result.map((user) => (
              <li key={user._id} onClick={(_) => add(user)}>
                <Avatar sx={{ width: 30, height: 30 }} src={user.image} />
                <span>{user.name}</span>
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
