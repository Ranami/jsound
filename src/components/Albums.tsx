import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongs } from "../fetchers/fetchSongs";
import { AlbumType, SongType } from "../types/musicTypes";

export const Albums = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs().then((data) => setAlbums(data));
  }, []);

  const handleNavigate = (album: SongType[]) => {
    navigate("/album", { state: album });
  };

  const Wrapper = styled("div")`
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  `;

  const Poster = styled("div")`
    &:hover {
      opacity: 0.7;
    }
    transition: 0.3s;
    cursor: pointer;
  `;

  return (
    <Wrapper>
      {albums.map((album) => (
        <Poster onClick={() => handleNavigate(album.songs)} key={album.name}>
          <img src={album.poster} alt={album.name} width="250px" />
          <p>{album.name}</p>
        </Poster>
      ))}
    </Wrapper>
  );
};
