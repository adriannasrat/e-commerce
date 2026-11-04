import React, { useLayoutEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlined from "@mui/icons-material/PersonAddAltOutlined";

export default function AuthForm({ signingUp }) {
  const heading = useRef(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  useLayoutEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  function submit(event) {
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
    form.reset();
    setVisible(false);
    setMessage(
      `This is a design preview. ${signingUp ? "Registration" : "Sign-in"} is not connected yet. Your details have not been sent or saved.`,
    );
  }

  return (
    <div className="sign-in-form-area">
      <p className="sign-in-kicker">YOUR OWN FREQUENCY</p>
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
        aria-describedby="sign-in-demo"
        onInput={(event) =>
          event.currentTarget.elements.confirmPassword?.setCustomValidity("")
        }
      >
        {signingUp && (
          <label className="sign-in-field">
            Full name
            <input
              name="name"
              autoComplete="name"
              placeholder="Your name"
              required
            />
          </label>
        )}
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
                "Password recovery will be available when accounts are connected. No reset email has been sent.",
              )
            }
          >
            Forgot password?
          </button>
        )}
        <button type="submit" className="sign-in-submit">
          {signingUp ? <PersonAddAltOutlined /> : <LoginOutlined />}
          {signingUp ? "Create account" : "Sign in"}
        </button>
        <p id="sign-in-demo" className="sign-in-demo">
          Design preview — account access is coming soon.
        </p>
      </form>
      <p className="sign-in-feedback" role="status">
        {message}
      </p>
    </div>
  );
}
