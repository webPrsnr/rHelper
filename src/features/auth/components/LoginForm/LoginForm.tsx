import { Form } from "@/components/Forms";
import { Input } from "@/components/Forms";
import { Button } from "@/components/Elements";
import { Link } from "react-router-dom";
import { z } from "zod";

import style from "./LoginForm.module.css";
import { useLogin } from "@/lib/auth";

interface LoginFormProps {
  onSuccess: () => void;
}

const schema = z.object({
  login: z.string().regex(/[a-z][a-z0-9_-]/i, "Только латинские буквы"),
  password: z.string().min(1, "Минимум 1 символ"),
});

export type LoginValues = z.infer<typeof schema>;

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const loginUser = useLogin();
  return (
    <section className={style["login-form__wrapper"]}>
      <Form<LoginValues, typeof schema>
        onSubmit={async (data) => {
          loginUser.mutate(data, {
            onSuccess: () => onSuccess(),
          });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <Input
              registration={register("login")}
              error={formState.errors["login"]}
              label={"Логин"}
              type="text"
            />
            <Input
              registration={register("password")}
              error={formState.errors["password"]}
              label={"Пароль"}
              type="text"
            />
            <Button
              type="submit"
              className={style["login-form__btn"]}
              isLoading={loginUser.isLoading}
            >
              Войти
            </Button>
            <div className={style["login-form__foter"]}>
              <Link className={style["login-form__link"]} to={"../register"}>
                Зарегестрироваться
              </Link>
            </div>
          </>
        )}
      </Form>
    </section>
  );
};
