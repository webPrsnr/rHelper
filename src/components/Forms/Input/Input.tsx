import { UseFormRegisterReturn } from "react-hook-form";
import {
  InputWrapper,
  InputWrapperPropsWithoutChildren,
} from "../InputWrapper/InputWrapper";
import { clsx } from "clsx";
import style from "./Input.module.css";

interface InputProps extends InputWrapperPropsWithoutChildren {
  type?: "text" | "password";
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
}

export const Input = ({
  type = "text",
  label,
  className,
  registration,
  error,
}: InputProps) => {
  return (
    <InputWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(style["input"], className)}
        {...registration}
      />
    </InputWrapper>
  );
};
