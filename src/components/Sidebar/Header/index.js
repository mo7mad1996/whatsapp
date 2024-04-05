import Image from "next/image";

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

          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
    </>
  );
}