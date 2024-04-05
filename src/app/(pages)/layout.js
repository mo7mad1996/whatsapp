import css from "./layout.module.css";

export default function MainLayout({ children }) {
  return (
    <div className={css.app}>
      <div className={css.app__body}>{children}</div>
    </div>
  );
}
