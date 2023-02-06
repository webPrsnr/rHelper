import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

import style from "./Button.module.css";
import { Spinner } from "../Spinner";

const variants = {
  primary: "primary",
  inverse: "inverse",
  danger: "danger",
};

const sizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
}

export const Button = ({
  type = "button",
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        style["button"],
        style[variants[variant]],
        style[sizes[size]],
        className
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" className={style["spinner__loading"]} />}
      {props.children}
    </button>
  );
};
