import { observer } from "mobx-react-lite";
import React from "react";
import { Title, PageWrapper } from "../components/styled/components";
import { useStore } from "../provider";

export const CollectionPage = observer(() => {
  const { store } = useStore();
  return (
    <PageWrapper>
      <Title variant="h3">Коллекция</Title>
      {store.favourite.songs?.map((song) => (
        <div>{song.title}</div>
      ))}
    </PageWrapper>
  );
});
