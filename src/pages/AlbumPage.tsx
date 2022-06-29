import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { SongType } from "../types/musicTypes";

type AlbumPageType = {};

type LocationProps = {
  state: SongType[];
};

export const AlbumPage: FC<AlbumPageType> = () => {
  const location = useLocation() as LocationProps;
  return (
    <div>
      {location.state?.map((song: SongType) => (
        <div>{song.artist}</div>
      ))}
    </div>
  );
};
