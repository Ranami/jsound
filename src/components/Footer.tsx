import { Typography } from "@mui/material";
import { Container, styled } from "@mui/system";
import React from "react";

const FooterContainer = styled(Container)`
  margin-bottom: 101px;
  color: white;
  padding: 24px;
  border-top: 0.5px solid #f4f4f430;
`;

export const Footer = () => {
  return (
    <FooterContainer maxWidth="lg">
      <Typography textAlign={"center"}>© 2022 JasAcademy</Typography>
    </FooterContainer>
  );
};
