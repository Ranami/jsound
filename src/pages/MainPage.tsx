import React from "react";
import { styled, Typography } from "@mui/material";
import { Albums } from "../components/Albums";

const Wrapper = styled("div")`
  padding: 50px 30px;
`;

const Title = styled(Typography)`
  color: white;
  display: inline-block;
  padding-bottom: 8px;
  border-bottom: 3px solid #ff4810;
`;

export const MainPage = () => {
  return (
    <Wrapper>
      <Title variant="h3">Главное</Title>
      <Albums />
    </Wrapper>
  );
};
