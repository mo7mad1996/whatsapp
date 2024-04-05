import Link from "next/link";

// css
import css from "./style.module.scss";

// components
import RegisterForm from "~/components/Auth/Register";
import OAuth from "~/components/Auth/OAuth";

export default function RegisterPage() {
  return (
    <main className={css.page}>
      <div className={css.content}>
        <RegisterForm />
        <OAuth />

        <div className="mb-2">
          I have an account, <Link href="/login">login</Link>.
        </div>
      </div>
    </main>
  );
}
