import { waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { providerRender } from "@/test/test-utils";
import { LoginForm, LoginValues } from "../LoginForm";

const user: LoginValues = {
  login: "Smith120",
  password: "123qwerty",
};

describe("Login Form", () => {
  it("should login user", async () => {
    const onSuccess = vi.fn();
    await providerRender(<LoginForm onSuccess={onSuccess} />);
    await userEvent.type(screen.getByLabelText(/логин/i), user.login);
    await userEvent.type(screen.getByLabelText(/пароль/i), user.password);

    userEvent.click(screen.getByRole("button", { name: /войти/i }));

    await waitFor(() => expect(onSuccess).toBeCalledTimes(1));
  });
});
