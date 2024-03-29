import { styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useStore } from "../provider";
import "../styles/audioplayer.css";
import { SongType } from "../types/musicTypes";

const Wrapper = styled("div")`
  position: fixed;
  bottom: 0;
  max-width: 1440px;
  width: 100%;
  background-color: rgba(27, 36, 48, 0.98);
`;

const Image = styled("div")`
  margin-right: 10px;
  & img {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled("div")`
  font-size: 16px;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled("div")`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoWrapper = styled("div")`
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  @media (max-width: 768px) {
    width: 200px;
  }
  @media (max-width: 600px) {
    width: 100px;
  }
`;

const SongWrapper = styled("div")`
  display: flex;
  align-items: center;
  width: 200px;
  white-space: pre;
  @media (max-width: 768px) {
    white-space: nowrap;
  }
  @media (max-width: 600px) {
    width: 100px;
  }
`;

type CustomAudioPlayerType = {
  song?: SongType;
};

export const CustomAudioPlayer: FC<CustomAudioPlayerType> = observer(
  ({ song }) => {
    const { store } = useStore();
    const [audio, setAudio] = useState(
      JSON.parse(localStorage.getItem("currentSong")!)?.url || ""
    );
    useEffect(() => {
      setAudio(store.currentSong.urlPlay);
    }, [store.currentSong]);

    const handleClickNext = useCallback(() => {
      store.switchToNextSong();
    }, [store]);

    const handleClickPrevious = useCallback(() => {
      store.switchToPreviousSong();
    }, [store]);

    return (
      <Wrapper>
        {audio && (
          <AudioPlayer
            src={audio}
            style={{
              textAlign: "center",
              color: "white",
            }}
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            onEnded={handleClickNext}
            autoPlayAfterSrcChange={store.autoplay}
            customControlsSection={[
              <SongWrapper>
                <Image>
                  <img src={song?.img} alt={song?.title} />
                </Image>
                <InfoWrapper>
                  <Title>{song?.title}</Title>
                  <Artist>{song?.artist}</Artist>
                </InfoWrapper>
              </SongWrapper>,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
            showSkipControls={true}
            showJumpControls={false}
          />
        )}
      </Wrapper>
    );
  }
);
