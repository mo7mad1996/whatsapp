// css
import css from "./style.module.scss";

// UI
import { Avatar, IconButton } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

// context
import { useContext } from "react";
import { AppContext } from "~/context";

export default function Participants({ participants }) {
  // context
  const { user_id } = useContext(AppContext);

  return (
    <section className={css.participants}>
      <h3>
        <span>Participants</span>
        <div>
          <span className={css.btn}>{participants?.length}</span>
          <IconButton>
            <IoIosArrowDown />
          </IconButton>
        </div>
      </h3>

      <ul className={css.participants_list}>
        {participants &&
          participants.map((u) => (
            <li key={u._id}>
              <Avatar className={css.img} />{" "}
              <span>
                {u.name}
                {u._id == user_id && " - (You)"}
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
}
