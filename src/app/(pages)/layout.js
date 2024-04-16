import css from "./layout.module.scss";
import Header from "~/components/layout/header";

export default function MainLayout({ children }) {
  return (
    <div className={css.app}>
      <Header />

      <div className={css.app__body}>{children}</div>
    </div>
  );
}
