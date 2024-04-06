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
          You don't have an account yet? <Link href="/register">Sign up</Link>.
        </div>
      </div>
    </main>
  );
}
