import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import RequireAuth from "../components/navigation/RequireAuth";
import Landing from "../routes/public/landing/Landing";
import PageNotFound from "../routes/page-not-found/PageNotFound";
import Authenticate from "../routes/public/authenticate/Authenticate";
import { RoutesType } from "../firebase/types";

const Dashboard = lazy(() => import("../routes/admin/Dashboard"));

const Routing = () => {
  return (
    <Routes>
      <Route path={RoutesType.HOME} element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path={RoutesType.AUTHENTICATE} element={<Authenticate />} />
        <Route
          path={RoutesType.DASHBOARD}
          element={
            <RequireAuth>
              <Suspense fallback={<div></div>}>
                <Dashboard />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default Routing;
