import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  styled,
  IconButton,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AlbumType, SongType } from "../types/musicTypes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStore } from "../provider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

type AlbumPageType = {};

type LocationProps = {
  state: AlbumType;
};

const Wrapper = styled("div")`
  padding: 50px 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const Poster = styled(Card)`
  background-color: transparent;
  cursor: pointer;
  position: relative;
  height: 400px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardMediaWrapper = styled("div")`
  &:hover::after {
    content: "";
    background: transparent;
    box-sizing: border-box;
    width: 0;
    height: 30px;
    position: absolute;
    top: 26%;
    right: 40%;
    border-color: transparent transparent transparent #ff4810;
    border-style: solid;
    border-width: 25px 0 25px 40px;
  }

  transition: 0.5s;
`;

const CustomCardMedia = styled(CardMedia)`
  cursor: pointer;
` as typeof CardMedia;

const CustomIconButton = styled(IconButton)`
  position: relative;
  right: 0;
  bottom: 0;
`;

export const AlbumPage: FC<AlbumPageType> = observer(() => {
  const location = useLocation() as LocationProps;

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

  const handleChooseSong = (song: SongType) => {
    store.setAlbum(location.state);
    store.changeCurrentSong(song);
  };

  const handleLike = (index: number) => {
    store.addToFavourite(location.state.songs?.[index]!);
  };

  const checkSongInFavourite = (song: SongType) => {
    if (
      toJS(store?.favourite).songs?.some(
        (favsong: SongType) => favsong.url === song.url
      )
    )
      return true;
    return false;
  };

  return (
    <Wrapper>
      {location.state.songs?.map((song: SongType, index) => (
        <Poster key={song.title} sx={{ maxWidth: 250 }}>
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
      ))}
    </Wrapper>
  );
});
