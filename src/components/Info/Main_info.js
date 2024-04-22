// css
import css from "./style.module.scss";

import Moment from "~/moment";

export default function Main_info({ chat }) {
  return (
    <section className={css.main_info}>
      <h3>Name: {chat.name}</h3>

      <div className={css.time}>
        Created
        <span>
          <Moment date={chat.createdAt} format={"DD MMM. YYYY"} />
        </span>
        <span>
          - <Moment date={chat.createdAt} toNow />
        </span>
      </div>

      <div>
        By <span>{chat.createdBy?.name}</span>
      </div>
    </section>
  );
}
