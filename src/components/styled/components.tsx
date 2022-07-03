import {
  Button,
  Card,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

export const Title = styled(Typography)`
  color: white;
  display: inline-block;
  padding-bottom: 8px;
  border-bottom: 3px solid #ff4810;
  text-transform: uppercase;
  font-size: 35px;
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

export const Poster = styled(Card)`
  background-color: #1b2430;
  cursor: pointer;
  position: relative;
  height: 400px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const CardMediaWrapper = styled("div")`
  &:hover::after {
    content: "";
    background: transparent;
    box-sizing: border-box;
    width: 0;
    height: 30px;
    position: absolute;
    top: 26%;
    right: 40%;
    border-color: transparent transparent transparent #ff4810;
    border-style: solid;
    border-width: 25px 0 25px 40px;
  }

  transition: 0.5s;
`;

export const CustomCardMedia = styled(CardMedia)`
  cursor: pointer;
` as typeof CardMedia;

export const CustomIconButton = styled(IconButton)`
  position: relative;
  right: 0;
  bottom: 0;
`;

export const SongsWrapper = styled("div")`
  padding: 50px 0 20px;
`;
