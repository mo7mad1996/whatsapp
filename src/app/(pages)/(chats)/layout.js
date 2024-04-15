// css
import css from "../layout.module.scss";

// icons
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { AiTwotonePlusCircle } from "react-icons/ai";
import Link from "next/link";

export default function MainLayout({ children }) {
  return (
    <div className={css.page}>
      <header className={css.Page_header}>
        <IoIosArrowBack className={css.icon} /> <h2>Messages</h2>
        <form className={css.form}>
          <input placeholder="Search" />

          <button>
            <IoIosSearch />
          </button>
        </form>
        <Link href="/new_message">
          <AiTwotonePlusCircle /> New Message
        </Link>
      </header>

      <>{children}</>
    </div>
  );
}
