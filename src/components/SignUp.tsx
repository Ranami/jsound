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
import { CustomBox } from "./SignIn";



const SignUp = ({ open, onClose }: ModalProps) => {
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
        phone: "",
        email: "",
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
          Регистрация
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
                  label="Введите пароль повторно"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Поле обязательное",
                // validate: (value) => {

                // },
              }}
              render={() => (
                <TextField
                  id="outlined-basic"
                  label="Введите почту"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          <Button
            sx={{display: 'block', margin: '0 auto'}}
            size={"large"}
            variant="contained"
            color={"secondary"}
            type="submit"
          >
            Создать Аккаунт
          </Button>
        </form>
      </CustomBox>
    </Modal>
  );
};

export default SignUp;
