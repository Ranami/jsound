import React, { useCallback } from "react";
import { FormControl, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormProps } from "../types/modalPropsTypes";
import { getFieldState } from "../utils/getFieldState";
import {
  ModalFooter,
  ModalSubmitButton,
  SwitchModalButton,
} from "./styled/components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useStore } from "../provider";

export type FormValues = {
  name: string;
  password: string;
  passwordRepeat: string;
  email: string;
};

const SignUp = ({ switchForm }: FormProps) => {
  const { store } = useStore();

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
      if (values.password !== values.passwordRepeat) {
        alert("Пароли не совпадают!");
      } else {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((cred) => {
            return db
              .collection("users")
              .doc(cred.user.uid)
              .set({
                name: values.name,
                currentSong:
                  JSON.parse(localStorage.getItem("currentSong")!) || {},
                currentAlbum:
                  JSON.parse(localStorage.getItem("currentAlbum")!) || {},
                favourite: [],
              });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              console.error(error.message);
              alert("The email address is already in use");
            } else if (error.code === "auth/invalid-email") {
              console.error(error.message);
              alert("The email address is not valid.");
            } else if (error.code === "auth/operation-not-allowed") {
              console.error(error.message);
              alert("Operation not allowed.");
            } else if (error.code === "auth/weak-password") {
              console.error(error.message);
              alert("The password is too weak.");
            }
          });
        reset();
      }

      store.setModalOpen(false);
    },
    [reset, store]
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
                if (value.length < 3) return "Type more than 2 symbols";
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
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(
                    value
                  ) ||
                  value.length === 0
                ) {
                  return true;
                } else {
                  return "The password must be at least 8 characters, include letters, numbers and special characters";
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
                  /^[\w-]+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(value) ||
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
        <ModalSubmitButton
          sx={{ display: "block", margin: "0 auto" }}
          size={"large"}
          variant="contained"
          color={"secondary"}
          type="submit"
        >
          Создать Аккаунт
        </ModalSubmitButton>
      </form>
      <ModalFooter>
        Уже есть аккаунт?
        <SwitchModalButton onClick={switchForm} disableRipple>
          Войдите
        </SwitchModalButton>
      </ModalFooter>
    </div>
  );
};

export default SignUp;
