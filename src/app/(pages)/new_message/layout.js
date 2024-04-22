// css
import css from "../layout.module.scss";

// components
import Header from "~/components/Header/new_message";

export default function MainLayout({ children }) {
  return (
    <div className={css.page}>
      <Header css={css} />

      {children}
    </div>
  );
}
