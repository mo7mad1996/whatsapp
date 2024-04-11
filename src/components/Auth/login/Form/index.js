"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// css
import css from "./style.module.scss";

// UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// icons
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export default function LoginForm() {
  // data
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [savelogin, setLogin] = useState(true);

  // router
  const router = useRouter();

  // methods
  function submit(e) {
    e.preventDefault();

    setLoading(true);

    axios
      .post("/api/users/login", user)
      .then(() => router.push("/"))
      .catch((err) => console.error(err));
  }

  // JSX
  return (
    <div className={css.loginForm}>
      <h1>Sign In your account</h1>
      <p>welcome back</p>
      <form onSubmit={submit}>
        <TextField
          id="username"
          label="Username"
          required
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <div className={css.flex}>
          <FormControlLabel
            label="remember me"
            control={
              <Checkbox
                checked={savelogin}
                onChange={() => setLogin((d) => !d)}
              />
            }
          />

          <Link href="/forget-password">Forget password?</Link>
        </div>

        <Button
          loading={loading.toString()}
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
