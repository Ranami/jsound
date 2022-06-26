import { styled, Typography } from "@mui/material";
import React from "react";

const Wrapper = styled("div")`
  margin: 25px 0 0 30px;
`;

const Title = styled(Typography)`
  color: white;
`;

export const MainPage = () => {
  return (
    <Wrapper>
      <Title variant="h2">Главное</Title>
    </Wrapper>
  );
};
