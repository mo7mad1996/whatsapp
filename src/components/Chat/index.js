// css
import css from "./style.module.css";

// components
import Header from "./Header";
import Messages from "./Messages";
import Form from "./Form";

export default function AppChat() {
  return (
    <div className={css.chat}>
      <Header />

      <Messages />
      <Form />
    </div>
  );
}
