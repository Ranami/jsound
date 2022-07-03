import { CardActions, CardContent, Grid, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useStore } from "../provider";
import { AlbumType, SongType } from "../types/musicTypes";
import { auth } from "../utils/firebase";
import {
  CardMediaWrapper,
  CustomCardMedia,
  CustomIconButton,
  Poster,
} from "./styled/components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

type SongsListProps = {
  choosenAlbum: AlbumType;
};

export const SongsList = observer(({ choosenAlbum }: SongsListProps) => {
  const { store } = useStore();

  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  });

  const checkSongInFavourite = (song: SongType) => {
    if (
      toJS(store?.favourite).songs?.some(
        (favsong: SongType) => favsong.url === song.url
      )
    )
      return true;
    return false;
  };

  const handleChooseSong = (song: SongType) => {
    store.setAlbum(choosenAlbum);
    store.changeCurrentSong(song);
  };

  const handleLike = (index: number) => {
    store.addToFavourite(choosenAlbum.songs?.[index]!, choosenAlbum);
  };

  return (
    <Grid
      container
      justifyContent={{ xs: "center", lg: "center", md: "left" }}
      columns={{ xs: 4, md: 12 }}
      spacing={{ xs: 3, md: 4 }}
    >
      {choosenAlbum.songs?.map((song: SongType, index) => (
        <Grid item key={song.title}>
          <Poster sx={{ maxWidth: 250 }}>
            <CardMediaWrapper onClick={() => handleChooseSong(song)}>
              <CustomCardMedia
                component={"img"}
                image={song.img}
                alt={song.artist}
                width={"250"}
                height={"250"}
              />
            </CardMediaWrapper>
            <CardContent>
              <Typography
                variant="subtitle2"
                color={"white"}
                textTransform={"uppercase"}
                fontWeight={600}
              >
                {song.artist}
              </Typography>
              <Typography
                variant="body2"
                color={"white"}
                textTransform={"uppercase"}
              >
                {song.title}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: "0px 8px",
                position: "absolute",
                bottom: "10px",
                right: 0,
                height: "30px",
              }}
              disableSpacing
            >
              {isLogged ? (
                <CustomIconButton
                  aria-label="add to favorites"
                  onClick={() => handleLike(index)}
                >
                  <FavoriteIcon
                    sx={{
                      color: checkSongInFavourite(song)
                        ? "rgb(255,0,0)"
                        : "rgb(255,255,255)",
                    }}
                  />
                </CustomIconButton>
              ) : null}
            </CardActions>
          </Poster>
        </Grid>
      ))}
    </Grid>
  );
});
