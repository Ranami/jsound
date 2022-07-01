import React from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormProps, ModalProps } from "../types/modalPropsTypes";

const SignUp = ({ switchForm }: FormProps) => {
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
    <div>
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
          sx={{ display: "block", margin: "0 auto" }}
          size={"large"}
          variant="contained"
          color={"secondary"}
          type="submit"
        >
          Создать Аккаунт
        </Button>
      </form>
      <p>
        Уже есть аккаунт? <Button onClick={switchForm}>Войдите</Button>
      </p>
    </div>
  );
};

export default SignUp;
