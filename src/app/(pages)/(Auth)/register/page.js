import Link from "next/link";

// components
import RegisterForm from "~/components/Auth/Register";
import OAuth from "~/components/Auth/OAuth";

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />
      <OAuth />

      <div className="mb-2">
        I have an account, <Link href="/login">login</Link>.
      </div>
    </>
  );
}
