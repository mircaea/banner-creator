import React from "react";
import BannersDashboard from "../../components/banners/admin/BannersDashboard";
import classes from "./dashboard.module.css";

function Dashboard() {
  return (
    <>
      <p className={classes.OtherContent}>[other content...]</p>
      <br />
      <BannersDashboard />
    </>
  );
}

export default Dashboard;
