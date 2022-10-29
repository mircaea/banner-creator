import classes from "./page-not-found.module.css";
import PNFSvg from "../../assets/svg/page_not_found.svg";
import { useNavigate } from "react-router-dom";
import { RoutesType } from "../../firebase/types";
import { Button } from "@mui/material";

function PageNotFound() {
  const navigate = useNavigate();

  const goToHomepage = () => navigate(RoutesType.HOME);
  const goBack = () => navigate(-1);

  return (
    <div className={classes.Outer}>
      <div className={classes.ImageOuter}>
        <img src={PNFSvg} alt="page-not-found" loading="lazy" />
      </div>
      <br />
      <p>Sorry! The page you're looking for cannot be found.</p>
      <Button onClick={goToHomepage} variant="outlined">
        Go to the home page
      </Button>
      &nbsp; or &nbsp;
      <Button onClick={goBack} variant="outlined">
        Go back
      </Button>
    </div>
  );
}

export default PageNotFound;
