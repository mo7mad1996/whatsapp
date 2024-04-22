"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// axios
import axios from "axios";

// css
import css from "./style.module.scss";

// UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function RegisterForm() {
  const router = useRouter();

  // data
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // methods
  function submit(e) {
    e.preventDefault();
    setLoading(true);

    // save the user
    axios
      .post("api/users/register", user)
      .then(() => router.push("/"))
      .catch(({ response }) => console.error(response?.data));
  }

  // compponents
  const fileds = Object.keys(user).map((key) => (
    <TextField
      key={key}
      id={key}
      label={key}
      type={key}
      required
      value={user[key]}
      onChange={(e) => setUser({ ...user, [key]: e.target.value })}
    />
  ));

  return (
    <div className={css.RegisterForm}>
      <h1>Create a new account</h1>
      <p>Please, Fill the following data</p>
      <form onSubmit={submit}>
        {fileds}

        <Button
          loading={loading.toString()}
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Register
        </Button>
      </form>
    </div>
  );
}
