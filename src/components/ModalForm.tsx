import { Box, Button, Modal, styled } from "@mui/material";
import React, { useState } from "react";
import { ModalProps } from "../types/modalPropsTypes";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CloseIcon from "@mui/icons-material/Close";

const CustomBox = styled(Box)`
  max-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  box-shadow: 0 24px 32px rgba(0, 0, 0, 0.04), 0 16px 24px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding: 24px 40px;
  gap: 26px;
  @media (max-width: 480px) {
    max-width: calc(100% - 50px);
    width: 100%;
    margin-top: 20px;
    height: 100%;
  }
`;

const CustomCloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 10px;
  &:hover {
    background-color: transparent;
  }
  @media (max-width: 480px) {
    right: 8px;
  }
`;

const CustomCloseIcon = styled(CloseIcon)`
  color: #ff4810;
  &:hover {
    color: #ff4810b9;
  }
  &:focus {
    background-color: transparent;
  }
`;

export const ModalForm = ({ open, onClose }: ModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleSwitch = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      keepMounted
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <CustomBox>
        <CustomCloseButton onClick={onClose}>
          <CustomCloseIcon />
        </CustomCloseButton>
        {isSignIn ? (
          <SignIn switchForm={handleSwitch} />
        ) : (
          <SignUp switchForm={handleSwitch} />
        )}
      </CustomBox>
    </Modal>
  );
};
