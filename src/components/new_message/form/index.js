"use client";

import { useState } from "react";
import axios from "axios";

// css
import css from "./style.module.scss";

// components
import People from "./People";

// icons
import { IoMdSend } from "react-icons/io";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

import { useRouter } from "next/navigation";

export default function New_Message_Form() {
  // router
  const router = useRouter();

  // context
  const { setCurrentChat } = useContext(AppContext);

  // data
  const [users, setTo] = useState([]);
  const [message, setMessage] = useState([]);

  // methods
  function create(e) {
    e.preventDefault();

    if (users.length) {
      const to = users.map((el) => el._id);

      axios.post("api/chats", { to, message }).then(({ data }) => {
        setCurrentChat(data);
        router.push("/");
      });
    }
  }

  // JSX
  return (
    <form className={css.form} onSubmit={create}>
      <div className={css.TEXT_FIELD}>
        <label htmlFor="Input">Name</label>
        <People to={users} setTo={setTo} />
      </div>
      <div className={css.TEXT_FIELD}>
        <label htmlFor="Input">Message</label>
        <textarea
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        ></textarea>
      </div>

      <button type="submit">
        <IoMdSend />

        <span>Send Message</span>
      </button>
    </form>
  );
}
