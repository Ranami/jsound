import React, { FC } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormProps } from "../types/modalPropsTypes";

const ButtonGroup = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignIn = ({ switchForm }: FormProps) => {
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
    <div>
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
        </ButtonGroup>
      </form>
      <p>
        Нет аккаунта? <Button onClick={switchForm}>Зарегистрироваться</Button>
      </p>
    </div>
  );
};

export default SignIn;
