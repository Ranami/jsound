import React from "react";
import { Albums } from "../components/Albums";
import { Title, PageWrapper } from "../components/styled/components";

export const MainPage = () => {
  return (
    <PageWrapper>
      <Title variant="h3">Главное</Title>
      <Albums />
    </PageWrapper>
  );
};
