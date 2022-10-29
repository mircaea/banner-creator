import React from "react";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import { useAppContext } from "../../context/AppContext";
import { sign_out } from "../../firebase/auth";
import { RoutesType } from "../../firebase/types";

function Header() {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  const signOut = () => {
    sign_out(
      () => navigate(RoutesType.HOME),
      () => {}
    );
  };

  return (
    <header className="Header">
      <div className="TopMenu">
        <NavLink to={RoutesType.HOME} end={true} className="LinkHeader">
          Home
        </NavLink>
        <NavLink to={RoutesType.AUTHENTICATE} className="LinkHeader">
          Sign in
        </NavLink>
        <NavLink to={RoutesType.DASHBOARD} className="LinkHeader">
          Dashboard
        </NavLink>
        {currentUser && (
          <Button onClick={signOut} variant="contained">
            Sign out
          </Button>
        )}
      </div>
      <img src={logo} className="Logo" alt="logo" />
    </header>
  );
}

export default Header;
