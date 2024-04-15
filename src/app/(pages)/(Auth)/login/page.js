import Link from "next/link";

// components
import LoginForm from "~/components/Auth/login/Form";
import OAuth from "~/components/Auth/OAuth";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <OAuth />
      <div className="mb-2">
        You don't have an account yet? <Link href="/register">Sign up</Link>.
      </div>
    </>
  );
}
