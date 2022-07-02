import { Button, styled, Typography } from "@mui/material";

export const Title = styled(Typography)`
  color: white;
  display: inline-block;
  padding-bottom: 8px;
  border-bottom: 3px solid #ff4810;
`;

export const PageWrapper = styled("div")`
  padding: 50px 30px;
`;

export const ModalSubmitButton = styled(Button)`
  width: 200px;
`;

export const ModalFooter = styled("p")`
  text-align: center;
  margin-bottom: 0;
  padding-bottom: 0;
`;

export const SwitchModalButton = styled(Button)`
  text-transform: none;
  color: #ff4810;
  &:hover {
    color: #ff1010e6;
    background-color: transparent;
  }
`;
