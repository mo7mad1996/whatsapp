// css
import scss from "../style.module.scss";

// icons
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { AiTwotonePlusCircle } from "react-icons/ai";
import Link from "next/link";

export default function Header({ css }) {
  return (
    <div className={scss.relative}>
      <header className={css.Page_header}>
        <IoIosArrowBack className={css.icon} /> <h2>New Message</h2>
        <div className={css.flex1}></div>
        <Link href="/new_message">
          <AiTwotonePlusCircle /> New Message
        </Link>
      </header>
    </div>
  );
}
