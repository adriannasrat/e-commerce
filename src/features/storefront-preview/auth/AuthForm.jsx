import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlined from "@mui/icons-material/PersonAddAltOutlined";
import HeadphonesOutlined from "@mui/icons-material/HeadphonesOutlined";
import { useAuth } from "./AuthContext";
import { paths, returnPath } from "../routes";
import { Spinner } from "../ui/Loading";

export default function AuthForm({ signingUp }) {
  const heading = useRef(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  // Which button is working: "form", "demo" or none.
  const [busy, setBusy] = useState("");
  const { user, signIn, signInToDemo, signOut, signUp } = useAuth();
  const navigate = useNavigate();
  const next = returnPath(useLocation().search) ?? paths.home;
  useLayoutEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      signingUp &&
      form.elements.password.value !== form.elements.confirmPassword.value
    ) {
      form.elements.confirmPassword.setCustomValidity("Passwords must match.");
      form.elements.confirmPassword.reportValidity();
      return;
    }
    const credentials = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    setBusy("form");
    setMessage("");
    try {
      await (signingUp ? signUp(credentials) : signIn(credentials));
      navigate(next);
    } catch (error) {
      setMessage(error.message);
      form.elements.password.value = "";
      setBusy("");
    }
  }

  async function tryDemo() {
    setBusy("demo");
    setMessage("");
    try {
      await signInToDemo();
      navigate(next);
    } catch (error) {
      setMessage(error.message);
      setBusy("");
    }
  }

  if (user) {
    return (
      <div className="sign-in-form-area">
        <p className="sign-in-kicker">Your own frequency</p>
        <h1 id="sign-in-title" ref={heading} tabIndex={-1}>
          Welcome.
        </h1>
        <p className="sign-in-intro">Signed in as {user.email}</p>
        <button
          type="button"
          className="sign-in-submit"
          onClick={() => signOut().catch((error) => setMessage(error.message))}
        >
          Sign out
        </button>
        <p className="sign-in-feedback" role="status">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="sign-in-form-area">
      <p className="sign-in-kicker">Your own frequency</p>
      <h1 id="sign-in-title" ref={heading} tabIndex={-1}>
        {signingUp ? "Sign up." : "Sign in."}
      </h1>
      <p className="sign-in-intro">
        {signingUp
          ? "A space for you. A sound of your own."
          : "Welcome back. Make yourself at home."}
      </p>
      <form
        onSubmit={submit}
        aria-label={signingUp ? "Sign up" : "Sign in"}
        onInput={(event) =>
          event.currentTarget.elements.confirmPassword?.setCustomValidity("")
        }
      >
        <label className="sign-in-field">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="sign-in-field" htmlFor="sign-in-password">
          Password
        </label>
        <div className="sign-in-password">
          <input
            id="sign-in-password"
            name="password"
            type={visible ? "text" : "password"}
            autoComplete={signingUp ? "new-password" : "current-password"}
            placeholder={
              signingUp ? "At least 8 characters" : "Enter your password"
            }
            minLength={signingUp ? 8 : undefined}
            required
          />
          <IconButton
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((previous) => !previous)}
          >
            {visible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
          </IconButton>
        </div>
        {signingUp ? (
          <label className="sign-in-field sign-in-confirm">
            Confirm password
            <input
              name="confirmPassword"
              type={visible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              required
            />
          </label>
        ) : (
          <button
            type="button"
            className="sign-in-forgot sign-in-text-button"
            onClick={() =>
              setMessage(
                "Password recovery is not available yet. No reset email has been sent.",
              )
            }
          >
            Forgot password?
          </button>
        )}
        <button type="submit" className="sign-in-submit" disabled={Boolean(busy)} aria-busy={busy === "form"}>
          {busy === "form" ? <Spinner /> : signingUp ? <PersonAddAltOutlined /> : <LoginOutlined />}
          {signingUp ? "Create account" : "Sign in"}
        </button>
      </form>
      <button
        type="button"
        className="sign-in-demo-button"
        onClick={tryDemo}
        disabled={Boolean(busy)}
        aria-busy={busy === "demo"}
      >
        {busy === "demo" ? <Spinner /> : <HeadphonesOutlined />}
        Try the demo
      </button>
      <p className="sign-in-demo">
        No email or password needed. Demo accounts are cleared every night.
      </p>
      <p className="sign-in-feedback" role="status">
        {message}
      </p>
    </div>
  );
}
