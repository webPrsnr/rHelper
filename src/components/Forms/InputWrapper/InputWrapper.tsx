import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

import style from "./InputWrapper.module.css";

interface InputWrapperProps {
  label?: string;
  className?: string;
  children: ReactNode;
  error?: FieldError | null;
}

export type InputWrapperPropsWithoutChildren = Omit<
  InputWrapperProps,
  "children" | "className"
>;

export const InputWrapper = ({
  label,
  className,
  children,
  error,
}: InputWrapperProps) => {
  return (
    <div className={style["input-wrapper__wrapper"]}>
      <label>
        {label}
        <div>{children}</div>
      </label>

      {error?.message && (
        <div className={style["input-wrapper__error"]}>{error.message}</div>
      )}
    </div>
  );
};
