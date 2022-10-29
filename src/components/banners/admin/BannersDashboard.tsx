import { Button, Grid } from "@mui/material";
import React, { useMemo, useState } from "react";
import { BannerType, EMPTY_BANNER } from "../../../firebase/types";
import BannersEdit from "./BannersEdit";
import BannersList from "../list/BannersList";
import { useAppContext } from "../../../context/AppContext";
import BannerPreview from "../preview/BannerPreview";

function BannersDashboard() {
  const { banners, currentUser } = useAppContext();
  // still testing for currentUser if this component ever gets used
  // in a Route that is not behind a RequireAuth component
  const [selected, setSelected] = useState<BannerType>();

  const toggleCreateNew = () => toggleSelect(EMPTY_BANNER);
  const toggleSelect = (item: BannerType) =>
    setSelected((prev) => (prev?.id === item.id ? undefined : item));

  const pool = useMemo(
    () =>
      banners && currentUser && selected
        ? banners.filter((el) => el.id === selected?.id)
        : banners,
    [currentUser, selected, banners]
  );

  const handleDeselect = () => setSelected(undefined);

  return (
    <Grid container columnSpacing={{ xs: 2, sm: 5, md: 10 }}>
      <Grid item xs>
        {!selected || selected.id !== "" ? (
          <Button variant="outlined" color="primary" onClick={toggleCreateNew}>
            Create new banner
          </Button>
        ) : null}
        {pool && pool.length ? (
          <BannersList pool={pool} handleSelect={toggleSelect} />
        ) : null}
        {selected && (
          <BannersEdit item={selected} handleDeselect={handleDeselect} />
        )}
      </Grid>
      <Grid item xs>
        {selected?.id && <BannerPreview item={selected} />}
      </Grid>
    </Grid>
  );
}

export default BannersDashboard;
