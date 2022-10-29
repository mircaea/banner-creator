import React from "react";
import classes from "./authenticate.module.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import {
  google_sign_in,
  sign_in,
  sign_out,
  sign_up,
} from "../../../firebase/auth";

import { Button, TextField } from "@mui/material";
import SignedIn from "../../../components/authenticate/SignedIn";
import { RoutesType } from "../../../firebase/types";

const def_msg = "Oups! Something went wrong. Try again later.";

function Authenticate() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || RoutesType.DASHBOARD;

  const { currentUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setError("");
  };
  const signUp = () => {
    sign_up(
      email,
      password,
      () => resetInputs(),
      (error) => setError(error?.message ?? def_msg)
    );
  };
  const signIn = () => {
    if (!email) {
      setError("Enter email");
      return;
    }
    if (!password) {
      setError("Enter password");
      return;
    }

    sign_in(
      email,
      password,
      () => {
        navigate(redirectTo);
      },
      (error) => setError(error?.message ?? def_msg)
    );
  };
  const googleSignIn = () => {
    // restrict user from accesing the page
    google_sign_in(
      () => navigate(redirectTo),
      (error) => setError(error?.message ?? def_msg)
    );
  };
  const logOut = () => {
    sign_out(
      () => {},
      () => {}
    );
  };

  const handleChangeEmail = (ev) => {
    setEmail(ev.target.value.trim());
    setError("");
  };
  const handleChangePassword = (ev) => {
    setPassword(ev.target.value);
    setError("");
  };
  const handleKeyUpEnter = (ev) => {
    if (ev.code === "Enter") signIn();
  };

  return (
    <>
      {currentUser ? (
        <SignedIn user={currentUser} logOut={logOut} />
      ) : (
        <div className={classes.Content}>
          <div>
            <TextField
              required
              label="Email"
              placeholder="..."
              onChange={handleChangeEmail}
              onKeyUp={handleKeyUpEnter}
              style={{ width: "100%" }}
            />
            <br />
            <TextField
              required
              type="password"
              label="Password"
              placeholder="***"
              onChange={handleChangePassword}
              onKeyUp={handleKeyUpEnter}
              style={{ margin: "16px 0", width: "100%" }}
            />
            <br />
            {error && <p className={classes.ErrorParagraph}>{error}</p>}
          </div>

          <div>
            <Button
              color="success"
              variant="contained"
              onClick={signIn}
              fullWidth={true}
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ margin: "10px 0" }}
              onClick={googleSignIn}
              fullWidth={true}
            >
              Sign in with Google
            </Button>
            <Button
              color="warning"
              variant="contained"
              onClick={signUp}
              fullWidth={true}
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Authenticate;
