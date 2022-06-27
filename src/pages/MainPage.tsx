import { styled, Typography } from "@mui/material";
import React from "react";

const Wrapper = styled("div")`
  margin: 50px 0 0 30px;
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
    </Wrapper>
  );
};
