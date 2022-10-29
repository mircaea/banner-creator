import { Button, Stack } from "@mui/material";
import { BannerType } from "../../../firebase/types";

function ExportOptions({ item }: { item: BannerType }) {
  const handleExport = () => {
    // export to facebook
  };
  const handleCopyToClipboard = () => {
    if (!item.url) return;
    navigator.clipboard.writeText(item.url);
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" color="success" onClick={handleExport}>
        Export
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleCopyToClipboard}
      >
        Copy image URL
      </Button>
    </Stack>
  );
}

export default ExportOptions;
