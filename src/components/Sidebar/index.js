// components
import Header from "./Header";
import Chats from "./Chats";

// css
import css from "./style.module.css";

const Sidebar = () => {
  return (
    <aside className={css.sidebar}>
      {/* header */}
      <Header />

      {/* chats */}
      <Chats />
    </aside>
  );
};

export default Sidebar;
