import { styled } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/audioplayer.css";
import { SongType } from "../types/musicTypes";

const Wrapper = styled("div")`
  position: fixed;
  bottom: 0;
  background-color: rgba(24, 24, 24, 0.8);
  max-width: 1440px;
  width: 100%;
`;

const Image = styled("div")`
  margin-right: 10px;
  & img {
    width: 50px;
  }
`;

const Title = styled("div")`
  font-size: 16px;
  font-weight: bold;
`;

const InfoWrapper = styled("div")`
  text-align: left;
`;

const SongWrapper = styled("div")`
  display: flex;
  align-items: center;
  width: 200px;
  white-space: pre;
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
        customControlsSection={[
          <SongWrapper>
            <Image>
              <img src={song?.img} alt={song?.title} />
            </Image>
            <InfoWrapper>
              <Title>{song?.title}</Title>
              <div>{song?.artist}</div>
            </InfoWrapper>
          </SongWrapper>,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
        onPlay={(e) => console.log("onPlay")}
        showSkipControls={true}
        showJumpControls={false}
      />
    </Wrapper>
  );
};
