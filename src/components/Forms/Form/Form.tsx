import { ReactNode } from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, ZodTypeDef } from "zod";
import { clsx } from "clsx";

import style from "./Form.module.css";

interface FormProps<FormInputs extends FieldValues, Schema> {
  className?: string;
  onSubmit: SubmitHandler<FormInputs>;
  children: (methods: UseFormReturn<FormInputs>) => ReactNode;
  options?: UseFormProps<FormInputs>;
  id?: string;
  schema?: Schema;
}

export const Form = <
  FormInputs extends Record<string, any> = Record<string, any>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  className,
  onSubmit,
  options,
  children,
  id,
  schema,
}: FormProps<FormInputs, Schema>) => {
  const methods = useForm<FormInputs>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  return (
    <form
      className={clsx(style["form__wrapper"], className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
