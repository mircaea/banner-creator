import { Button } from "@mui/material";
import React from "react";

function SelectedDetails({ item }) {
  const handleExport = () => {};

  return (
    <div>
      <p>{item?.text}</p>
      <br />
      <img src={item?.url} alt="banner" />
      <br />
      <Button color="primary" variant="contained" onClick={handleExport}>
        Export
      </Button>
    </div>
  );
}

export default SelectedDetails;
