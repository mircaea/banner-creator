import { Button } from "@mui/material";
import React from "react";

function SignedIn({ user, logOut }) {
  return (
    <>
      <p>
        Already signed in as: <b>{user.email}</b>
      </p>
      <Button color="error" variant="outlined" onClick={logOut}>
        Log out
      </Button>
    </>
  );
}

export default SignedIn;
