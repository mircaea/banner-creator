import { Navigate, useLocation } from "react-router-dom";
import { RoutesType } from "../../firebase/types";

function RequireAuth({ children }) {
  const location = useLocation();
  const data = localStorage.getItem("logged_in");

  if (!data) {
    return (
      <Navigate
        to={`/${RoutesType.AUTHENTICATE}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;
