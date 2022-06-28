import { styled } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/audioplayer.css";
import { SongType } from "../types/songType";

const Wrapper = styled("div")`
  position: fixed;
  bottom: 0;
  background-color: rgba(24, 24, 24, 0.8);
  max-width: 1440px;
  width: 100%;
`;

type CustomAudioPlayerType = {
  song?: SongType;
};

export const CustomAudioPlayer: FC<CustomAudioPlayerType> = ({ song }) => {
  const [audio, setAudio] = useState(song?.urlPlay);

  useEffect(() => {
    setAudio(song?.urlPlay);
  }, [song]);

  return (
    <Wrapper>
      <AudioPlayer
        src={audio}
        style={{
          textAlign: "center",
          backgroundColor: "#1B2430",
          color: "white",
        }}
        onPlay={(e) => console.log("onPlay")}
        showSkipControls={true}
        showJumpControls={false}
        header={`${song?.artist} - ${song?.title}`}
      />
    </Wrapper>
  );
};
