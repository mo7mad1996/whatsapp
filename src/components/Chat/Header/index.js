// UI
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// icons
import { MdSearch, MdOutlineMoreVert, MdAttachFile } from "react-icons/md";

// css
import css from "../style.module.scss";

export default function ChatHeader({ lastseen, name }) {
  return (
    <div className={css.chat__header}>
      <Avatar />

      <h3>{name}</h3>

      <IconButton className={css.menu_btn}>
        <MdOutlineMoreVert />
      </IconButton>
    </div>
  );
}
