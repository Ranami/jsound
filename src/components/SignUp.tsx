import React, { useCallback } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormProps, ModalProps } from "../types/modalPropsTypes";
import { getFieldState } from "../utils/getFieldState";

export type FormValues = {
  name: string;
  password: string;
  passwordRepeat: string;
  email: string;
};

const SignUp = ({ switchForm }: FormProps) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      passwordRepeat: "",
      email: "",
    },
  });

  const onSubmit = useCallback(
    (values: FormValues) => {
      if(values.password !== values.passwordRepeat) {
        alert("Пароли не совпадают!");
      }else {
        console.log(values);
        reset();
      }
    },
    [reset]
  );

  return (
    <div>
      <Typography textAlign={"center"} variant="h5">
        Регистрация
      </Typography>
      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Controller
            name="name"
            control={control}
            rules={{
              validate: (value) => {
                if (value.length < 5) return "Type more than 5 symbols";
                return true;
              },
              required: "Поле обязательное",
            }}
            render={({ field, fieldState, formState }) => (
              <TextField
                label="Имя"
                variant="outlined"
                {...field}
                {...getFieldState({ formState, fieldState })}
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
              validate: (value) => {
                if (
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(value) ||
                  value.length === 0
                ) {
                  return true;
                } else {
                  return "Please type valid password";
                }
              },
            }}
            render={({ field, fieldState, formState }) => (
              <TextField
                label="Введите пароль"
                type="password"
                variant="outlined"
                {...field}
                {...getFieldState({ formState, fieldState })}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <Controller
            name="passwordRepeat"
            control={control}
            rules={{
              required: "Поле обязательное",
              validate: (value) => {
                if (
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(value) ||
                  value.length === 0
                ) {
                  return true;
                } else {
                  return "Please type valid password";
                }
              },
            }}
            render={({ field, fieldState, formState }) => (
              <TextField
                type="password"
                label="Введите пароль повторно"
                variant="outlined"
                {...field}
                {...getFieldState({ formState, fieldState })}
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
              validate: (value) => {
                if (
                  /^[\w\.-]+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(value) ||
                  value.length === 0
                ) {
                  return true;
                } else {
                  return "Please type valid email";
                }
              },
            }}
            render={({ field, fieldState, formState }) => (
              <TextField
                label="Введите почту"
                variant="outlined"
                {...field}
                {...getFieldState({ formState, fieldState })}
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
