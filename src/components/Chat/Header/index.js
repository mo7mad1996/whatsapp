// UI
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// icons
import { MdSearch, MdOutlineMoreVert, MdAttachFile } from "react-icons/md";

// css
import css from "../style.module.css";

export default function ChatHeader({ lastseen, name }) {
  return (
    <div className={css.chat__header}>
      <Avatar />

      <div className={css.chat__headerInfo}>
        <h3>{name}</h3>
        {lastseen && <p>Last seen at: {lastseen} </p>}
      </div>
      <div className={css.chat__headerRight}>
        <Stack direction="row">
          <IconButton>
            <MdSearch />
          </IconButton>
          <IconButton>
            <MdAttachFile />
          </IconButton>
          <IconButton>
            <MdOutlineMoreVert />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
}
