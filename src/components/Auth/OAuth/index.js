// css
import css from "./style.module.scss";
import "./buttons.css";

// images
import { GoogleIcon, FacebookIcon } from "./icons.js";

export default function OAuth() {
  return (
    <div className={css.OAuth}>
      <div className={css.or}>
        <span>or</span>
      </div>

      <div className={css.buttons}>
        <GoogleBtn />
        <FacebookBtn />
      </div>
    </div>
  );
}

// compopnents
function GoogleBtn() {
  return (
    <button className="gsi-material-button">
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <GoogleIcon />
        </div>
        <span className="gsi-material-button-contents">
          Sign in with Google
        </span>
        <span style={{ display: "none" }}>Sign in with Google</span>
      </div>
    </button>
  );
}
function FacebookBtn() {
  return (
    <button className="gsi-material-button">
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <FacebookIcon />
        </div>
        <span className="gsi-material-button-contents">
          Sign in with Facebook
        </span>
        <span style={{ display: "none" }}>Sign in with Google</span>
      </div>
    </button>
  );
}
