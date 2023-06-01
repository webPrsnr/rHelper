import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  InputWrapper,
  InputWrapperPropsWithoutChildren,
} from "../InputWrapper";

import style from "./TextArea.module.css";

interface TextAreaProps extends InputWrapperPropsWithoutChildren {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  text: string;
}

export const TextArea = ({
  label,
  className,
  registration,
  error,
  text,
}: TextAreaProps) => {
  return (
    <InputWrapper label={label} error={error}>
      <textarea
        {...registration}
        defaultValue={text}
        className={clsx(className, style["textarea"])}
      />
    </InputWrapper>
  );
};
