import { Stack } from "@mui/material";
import React from "react";
import { BannerType } from "../../../firebase/types";

function BannerPreview({ item }: { item: BannerType }) {
  return (
    <Stack spacing={2}>
      <p>{item?.text}</p>
      <img src={item?.url} alt="banner" />
    </Stack>
  );
}

export default BannerPreview;
