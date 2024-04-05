// components
import Header from "./Header";
import Chats from "./Chats";

// css
import css from "./style.module.css";

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      {/* header */}
      <Header />

      {/* chats */}
      <Chats />
    </div>
  );
};

export default Sidebar;
