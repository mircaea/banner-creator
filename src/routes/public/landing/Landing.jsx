import React from "react";
import classes from "./landing.module.css";
import BannersFrontend from "../../../components/banners/client/BannersFrontend";

function Landing() {
  return (
    <div className={classes.Outer}>
      <p>View and export banners</p>
      <BannersFrontend />
    </div>
  );
}

export default Landing;
