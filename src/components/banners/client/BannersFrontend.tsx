import React, { useState } from "react";
import { BannerType } from "../../../firebase/types";
import BannersList from "../list/BannersList";
import { useAppContext } from "../../../context/AppContext";
import BannerPreview from "../preview/BannerPreview";
import ExportOptions from "./ExportOptions";
import { Stack } from "@mui/system";
import { Grid } from "@mui/material";

function BannersFrontend() {
  const { banners } = useAppContext();
  const [selected, setSelected] = useState<BannerType>();

  const handleSelect = (item: BannerType) => {
    setSelected((prev) => {
      if (prev && prev.id === item.id) {
        return undefined;
      } else return item;
    });
  };

  return (
    <Grid container columnSpacing={{ xs: 2, sm: 5, md: 10 }}>
      <Grid item xs>
        <BannersList pool={banners} handleSelect={handleSelect} />
      </Grid>
      {selected && (
        <Grid item xs>
          <Stack spacing={4}>
            <BannerPreview item={selected} />
            <ExportOptions item={selected} />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default BannersFrontend;
