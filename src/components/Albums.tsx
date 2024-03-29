import { Grid, styled, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongs } from "../fetchers/fetchSongs";
import { AlbumType } from "../types/musicTypes";
import CircularProgress from "@mui/material/CircularProgress";
import { useStore } from "../provider";
import { observer } from "mobx-react-lite";

const Wrapper = styled("div")`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  position: relative;
`;

const Poster = styled("div")`
  &:hover {
    opacity: 0.7;
  }
  transition: 0.3s;
  cursor: pointer;
`;

const Img = styled("img")`
  width: 250px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const CustomCircularProgress = styled(CircularProgress)`
  color: white;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
`;

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
  }, [store]);

  const loadImage = useCallback((image: AlbumType) => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image.poster!;
      loadImg.onload = () => resolve(image.poster);
      loadImg.onerror = (err) => reject(err);
    });
  }, []);

  useEffect(() => {
    if (!albums?.length) return;

    Promise.all(albums.map((album) => loadImage(album)))
      .then(() => setImagesLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, [store.albums, albums, loadImage]);

  const handleNavigate = useCallback(
    (album: AlbumType) => {
      navigate("/album", { state: album });
    },
    [navigate]
  );

  return (
    <Wrapper>
      {!imagesLoaded ? (
        <CustomCircularProgress />
      ) : (
        <Grid
          container
          justifyContent={{ xs: "center", lg: "center", md: "left" }}
          columns={{ xs: 4, md: 12 }}
          spacing={{ xs: 3, md: 4 }}
        >
          {albums?.map((album) => (
            <Grid item key={album.name}>
              <Poster onClick={() => handleNavigate(album)}>
                <Img src={album.poster} alt={album.name} />
                <Typography
                  variant="subtitle2"
                  color={"white"}
                  textTransform={"uppercase"}
                  fontWeight={600}
                >
                  {album.name}
                </Typography>
              </Poster>
            </Grid>
          ))}
        </Grid>
      )}
    </Wrapper>
  );
});
