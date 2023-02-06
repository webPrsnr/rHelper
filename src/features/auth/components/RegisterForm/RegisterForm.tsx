import { Form } from "@/components/Forms";
import { Input } from "@/components/Forms";
import { Button } from "@/components/Elements";
import { Link } from "react-router-dom";
import { z } from "zod";

import style from "./RegisterForm.module.css";
import { useRegister } from "@/lib/auth";

interface RegisterFormProps {
  onSuccess: () => void;
}
const schema = z.object({
  login: z.string().regex(/[a-z][a-z0-9_-]/i, "Только латинские буквы"),
  firstName: z.string().min(1, "Минимум 1 символ"),
  lastName: z.string().min(1, "Минимум 1 символ"),
  organization: z.string().min(1, "Минимум 1 символ"),
  password: z.string().min(1, "Минимум 1 символ"),
});

export type RegisterValues = z.infer<typeof schema>;

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registerUser = useRegister();

  return (
    <section className={style["register-form__wrapper"]}>
      <Form<RegisterValues, typeof schema>
        onSubmit={(data) => {
          registerUser.mutate(data, {
            onSuccess: () => onSuccess(),
          });
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              error={formState.errors["firstName"]}
              registration={register("firstName")}
              type="text"
              label="Имя"
            />
            <Input
              error={formState.errors["lastName"]}
              registration={register("lastName")}
              type="text"
              label="Фамилия"
            />
            <Input
              error={formState.errors["organization"]}
              registration={register("organization")}
              type="text"
              label="Организация"
            />
            <Input
              error={formState.errors["login"]}
              registration={register("login")}
              type="text"
              label="Логин"
            />
            <Input
              error={formState.errors["password"]}
              registration={register("password")}
              type="password"
              label="Пароль"
            />
            <Button
              type="submit"
              className={style["register-form__btn"]}
              isLoading={registerUser.isLoading}
            >
              Зарегестрироваться
            </Button>
            <div className={style["register-form__foter"]}>
              <Link className={style["register-form__link"]} to={"../login"}>
                Уже зарегестрирован
              </Link>
            </div>
          </>
        )}
      </Form>
    </section>
  );
};
