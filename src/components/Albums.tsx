import { styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongs } from "../fetchers/fetchSongs";
import { AlbumType, SongType } from "../types/musicTypes";
import CircularProgress from "@mui/material/CircularProgress";
import { useStore } from "../provider";
import { observer } from "mobx-react-lite";

export const Albums = observer(() => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<AlbumType[]>();
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const { store } = useStore();

  useEffect(() => {
    fetchSongs().then((data) => {
      store.uploadAlbums(data);
      setAlbums(data);
    });
  }, []);

  useEffect(() => {
    if (!albums?.length) return;

    const loadImage = (image: AlbumType) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.poster!;
        loadImg.onload = () => resolve(image.poster);
        loadImg.onerror = (err) => reject(err);
      });
    };
    Promise.all(albums.map((album) => loadImage(album)))
      .then(() => setImagesLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, [store.albums]);

  const handleNavigate = (album: AlbumType) => {
    navigate("/album", { state: album });
  };

  const Wrapper = styled("div")`
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  `;

  const Poster = styled("div")`
    &:hover {
      opacity: 0.7;
    }
    transition: 0.3s;
    cursor: pointer;
  `;

  const CustomCircularProgress = styled(CircularProgress)`
    color: white;
  `;

  return (
    <Wrapper>
      {!imagesLoaded ? (
        <CustomCircularProgress />
      ) : (
        albums?.map((album) => (
          <Poster onClick={() => handleNavigate(album)} key={album.name}>
            <img src={album.poster} alt={album.name} width="250px" />
            <Typography
              variant="subtitle2"
              color={"white"}
              textTransform={"uppercase"}
              fontWeight={600}
            >
              {album.name}
            </Typography>
          </Poster>
        ))
      )}
    </Wrapper>
  );
});
