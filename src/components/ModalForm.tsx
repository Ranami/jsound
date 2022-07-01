import { Box, FormControl, Modal, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { ModalProps } from "../types/modalPropsTypes";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export const CustomBox = styled(Box)`
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
        {isSignIn ? (
          <SignIn switchForm={handleSwitch} />
        ) : (
          <SignUp switchForm={handleSwitch} />
        )}
      </CustomBox>
    </Modal>
  );
};
