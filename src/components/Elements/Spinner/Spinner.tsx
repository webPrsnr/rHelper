import clsx from "clsx";

import style from "./Spinner.module.css";

const sizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

const variants = {
  primary: "primary",
};

export interface SpinnerProps {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
}

export const Spinner = ({
  size = "md",
  variant = "primary",
  className,
}: SpinnerProps) => {
  return (
    <>
      <svg
        className={clsx(style["spinner"], style[sizes[size]], className)}
        viewBox="0 0 50 50"
      >
        <circle
          className={clsx(style["path"], style[variants[variant]])}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </>
  );
};
