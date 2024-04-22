// css
import css from "../layout.module.scss";

// components
import Form from "~/components/new_message/form";

export default function New_message_page() {
  return (
    <div className={css.page}>
      <Form />
    </div>
  );
}
