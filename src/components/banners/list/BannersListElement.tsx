import React from "react";
import { BannerType } from "../../../firebase/types";
import classes from "./banners-list.module.css";

interface BannersListElementProps {
  item: BannerType;
  handleSelect: (item: BannerType) => void;
}

function BannersListElement({ item, handleSelect }: BannersListElementProps) {
  const onClick = () => handleSelect(item);

  return (
    <li className={classes.ListElement} onClick={onClick}>
      <p>{item?.text}</p>
    </li>
  );
}

export default BannersListElement;
