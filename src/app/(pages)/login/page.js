import Link from "next/link";

// css
import css from "./style.module.scss";

// components
import LoginForm from "~/components/Auth/login/Form";
import OAuth from "~/components/Auth/OAuth";

export default function LoginPage() {
  return (
    <main className={css.page}>
      <div className={css.content}>
        <LoginForm />
        <OAuth />

        <div className="mb-2">
          new create a <Link href="/register">new Acout here</Link>.
        </div>
      </div>
    </main>
  );
}
