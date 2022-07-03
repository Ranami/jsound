import React, { useContext } from "react";
import { FormControl, styled, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormProps } from "../types/modalPropsTypes";
import {
  ModalFooter,
  ModalSubmitButton,
  SwitchModalButton,
} from "./styled/components";
import { getFieldState } from "../utils/getFieldState";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const ButtonGroup = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type ValueProps = {
  email: string;
  password: string;
};

const SignIn = ({ switchForm }: FormProps) => {
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = ({ email, password }: ValueProps) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };


  return (
    <div>
      <Typography textAlign={"center"} variant="h5">
        Войти в аккаунт
      </Typography>
      <form
        style={{ marginTop: "20px" }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
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
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Поле обязательное",
              validate: (value) => {
                if (
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(
                    value
                  ) ||
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
        <ModalSubmitButton
          sx={{ display: "block", margin: "0 auto" }}
          size={"large"}
          variant="contained"
          color={"secondary"}
          type="submit"
        >
          Войти
        </ModalSubmitButton>
      </form>
      <ModalFooter>
        Нет аккаунта?
        <SwitchModalButton onClick={switchForm}>
          Зарегистрироваться
        </SwitchModalButton>
      </ModalFooter>
    </div>
  );
};

export default SignIn;
