import { Button, Input, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { deleteFile } from "../../../firebase/storage";
import { BannerType } from "../../../firebase/types";

interface BannerEditProps {
  item: BannerType;
  handleDelete: () => void;
  handleDeselect: () => void;
}

function BannersEdit({ item, handleDelete, handleDeselect }: BannerEditProps) {
  const { create_banner, update_banner, upload_file } = useAppContext();
  const [text, setText] = useState("");
  const [file, setFile] = useState<any>();

  useEffect(() => {
    setText(item?.text);
  }, [item]);

  const handleChangeText = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(ev.target.value);
  };
  const handleSave = async () => {
    let _url = item?.url;
    if (file) {
      const resp = await upload_file(file);
      if (!resp) {
        // eh
      }
      if (item?.url) await deleteFile(item.url);
      _url = resp;
    }

    if (item.id) {
      await update_banner({ ...item, text, url: _url });
    } else {
      await create_banner({ text, url: _url });
    } // eh

    handleDeselect();
  };

  const handleFileSelect = (ev: any) => {
    const file = ev.target.files[0];
    setFile(file);
  };

  return (
    <>
      <br />
      <p>{item?.id ? `Edit banner: ${item?.text}` : "Create new banner"}</p>
      <br />

      <Stack spacing={2}>
        <Stack spacing={2}>
          <TextField
            required
            value={text}
            label="Text"
            size="small"
            placeholder="Enter text"
            onChange={handleChangeText}
            fullWidth={true}
          />
          <Input
            onChange={handleFileSelect}
            type="file"
            disableUnderline={true}
            // accept="image/*"
          />
        </Stack>

        <div className="FullWidthBottomBorder" />

        <Stack spacing={2} direction="row">
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={handleDeselect}>
            Cancel
          </Button>
          {item?.id && (
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete this banner
            </Button>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default BannersEdit;
