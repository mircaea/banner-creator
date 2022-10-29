import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/navigation/Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="LayoutOutlet">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
