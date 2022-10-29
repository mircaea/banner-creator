import React from "react";
import { BannerType } from "../../../firebase/types";
import classes from "./banners-list.module.css";
import BannersListElement from "./BannersListElement";

export interface BannersListProps {
  pool: BannerType[];
  handleSelect: (item: BannerType) => void;
}

function BannersList({ pool, handleSelect }: BannersListProps) {
  return (
    <ul className={classes.List}>
      {pool.map((el, idx) => (
        <BannersListElement item={el} handleSelect={handleSelect} key={idx} />
      ))}
    </ul>
  );
}

export default BannersList;
