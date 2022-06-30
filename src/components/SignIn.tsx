import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ModalProps } from "../types/modalPropsTypes";


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

const ButtonGroup = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SignIn = ({ open, onClose }: ModalProps) => {
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      //   phone: "",
      //   email: "",
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      keepMounted
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <CustomBox>
        <Typography textAlign={"center"} variant="h5">
          Войти в аккаунт
        </Typography>
        <form style={{ marginTop: "20px" }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                validate: (value) => {
                  if (value.length < 3) return "Type more than 3 symbols";
                  return true;
                },
                required: "Поле обязательное",
              }}
              render={() => (
                <TextField id="outlined-basic" label="Имя" variant="outlined" />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Поле обязательное",
                // validate: (value) => {

                // },
              }}
              render={() => (
                <TextField
                  id="outlined-basic"
                  label="Введите пароль"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          <ButtonGroup>
          <Button
            size={"large"}
            variant="contained"
            color={"secondary"}
            type="submit"
          >
            Войти
          </Button>
          <Button
            size={"large"}
            variant="contained"
            color={"secondary"}
            type="button"
          >
            Создать Аккаунт
          </Button>
          </ButtonGroup>
        </form>
      </CustomBox>
    </Modal>
  );
};

export default SignIn;
