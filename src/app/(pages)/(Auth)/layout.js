// css
import css from "./style.module.scss";

export default function AuthLayout({ children }) {
  return (
    <main className={css.page}>
      <div className={css.content}>{children}</div>
    </main>
  );
}
