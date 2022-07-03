import { styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
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
`;

const Title = styled("div")`
  font-size: 16px;
  margin-bottom: 3px;
`;

const Artist = styled("div")`
  font-size: 14px;
`;

const InfoWrapper = styled("div")`
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
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

export const CustomAudioPlayer: FC<CustomAudioPlayerType> = observer(
  ({ song }) => {
    const { store } = useStore();
    const [audio, setAudio] = useState(
      JSON.parse(localStorage.getItem("currentSong")!).url || ""
    );

    useEffect(() => {
      setAudio(store.currentSong.urlPlay);
    }, [store.currentSong]);

    const handleClickNext = () => {
      store.switchToNextSong();
    };

    const handleClickPrevious = () => {
      store.switchToPreviousSong();
    };

    return (
      <Wrapper>
        {audio && (
          <AudioPlayer
            src={audio}
            style={{
              textAlign: "center",
              color: "white",
            }}
            onClickNext={() => handleClickNext()}
            onClickPrevious={() => handleClickPrevious()}
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
