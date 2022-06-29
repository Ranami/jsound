import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  styled,
  IconButton,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { SongType } from "../types/musicTypes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

type AlbumPageType = {};

type LocationProps = {
  state: SongType[];
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
`;

const CustomCardMedia = styled(CardMedia)`
  &:hover {
    opacity: 0.7;
  }
  transition: 0.3s;
  cursor: pointer;
` as typeof CardMedia;

export const AlbumPage: FC<AlbumPageType> = () => {
  const location = useLocation() as LocationProps;
  return (
    <Wrapper>
      {location.state?.map((song: SongType) => (
        <Poster key={song.rank} sx={{ maxWidth: 250 }}>
          <CustomCardMedia
            component={"img"}
            image={song.img}
            alt={song.artist}
            width={"250"}
            height={"250"}
          />
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
          <CardActions sx={{padding: '0px 8px'}} disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ color: "rgb(233, 30, 99)" }} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon sx={{ color: "white" }} />
            </IconButton>
          </CardActions>
        </Poster>
      ))}
    </Wrapper>
  );
};
