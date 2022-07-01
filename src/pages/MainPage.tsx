import React from "react";
import { styled } from "@mui/material";
import { Albums } from "../components/Albums";
import { Title, Wrapper } from "../components/styled/components";

export const MainPage = () => {
  return (
    <Wrapper>
      <Title variant="h3">Главное</Title>
      <Albums />
    </Wrapper>
  );
};
