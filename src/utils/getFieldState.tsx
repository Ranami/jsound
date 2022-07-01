import {ControllerFieldState, UseFormStateReturn} from 'react-hook-form';
import { FormValues } from '../components/SignUp';

type Fields = {
    formState: UseFormStateReturn<FormValues>,
    fieldState: ControllerFieldState,
}

export function getFieldState( {formState, fieldState}:Fields) {
    return {
      error: formState.isSubmitted && fieldState.isTouched && !!fieldState.error,
      helperText:
        formState.isSubmitted &&
        fieldState.isTouched &&
        fieldState.error?.message,
    };
  }