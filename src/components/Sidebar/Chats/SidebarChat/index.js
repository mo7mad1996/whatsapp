import Avatar from "@mui/material/Avatar";

// css
import css from "./style.module.css";

export default function SidebarChat() {
  return (
    <div className={css.sidebarChat}>
      <Avatar />

      <div className={css.sidebarChat__info}>
        <h2>Room name</h2>
        <p>
          This is the last message lorem iajsd asdkj asasdkj jasd j jh asdiu{" "}
        </p>
      </div>
    </div>
  );
}
