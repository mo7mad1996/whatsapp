// icons
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";

// css
import css from "./style.module.scss";

export default function Header() {
  return (
    <header className={css.header}>
      <nav>
        <a href="#">Sex</a>
        <a href="#">Hair</a>
      </nav>

      <div>
        <a href="#">Logo</a>
      </div>
      <nav>
        <a href="#">Reviews</a>
        <a href="#">Blog</a>
        <a href="#">
          <FaSearch />
        </a>
        <a href="#">
          <AiOutlineShopping />
        </a>
        <a href="#">
          <FaUserCircle /> My account
        </a>
      </nav>
    </header>
  );
}
