import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { AlbumType } from "../types/musicTypes";
import { SongsList } from "../components/SongsList";
import {
  PageWrapper,
  SongsWrapper,
  Title,
} from "../components/styled/components";

type AlbumPageType = {};

type LocationProps = {
  state: AlbumType;
};

export const AlbumPage: FC<AlbumPageType> = () => {
  const location = useLocation() as LocationProps;

  return (
    <PageWrapper>
      <Title>{location.state.name}</Title>
      <SongsWrapper>
        <SongsList choosenAlbum={location.state} />
      </SongsWrapper>
    </PageWrapper>
  );
};
