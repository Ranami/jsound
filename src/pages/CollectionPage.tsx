import { styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { SongsList } from "../components/SongsList";
import {
  Title,
  PageWrapper,
  SongsWrapper,
} from "../components/styled/components";
import { useStore } from "../provider";

const Message = styled("div")`
  color: white;
  font-size: 30px;
`;

export const CollectionPage = observer(() => {
  const { store } = useStore();
  return (
    <PageWrapper>
      <Title variant="h3">Коллекция</Title>
      <SongsWrapper>
        {store.favourite.songs?.length !== 0 ? (
          <SongsList choosenAlbum={store.favourite} />
        ) : (
          <Message>
            Нет понравившихся песен. Добавьте их нажав на "сердечко"!
          </Message>
        )}
      </SongsWrapper>
    </PageWrapper>
  );
});
