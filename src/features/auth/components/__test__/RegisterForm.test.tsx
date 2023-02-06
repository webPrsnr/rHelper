import { waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { providerRender } from "@/test/test-utils";
import { RegisterForm, RegisterValues } from "../RegisterForm";

const newUser: RegisterValues = {
  firstName: "William",
  lastName: "Smith",
  login: "Smith120",
  organization: "ABComp",
  password: "123qwerty",
};

describe("Register Form", () => {
  it("should register new user", async () => {
    const onSuccess = vi.fn();

    await providerRender(<RegisterForm onSuccess={onSuccess} />);
    await userEvent.type(screen.getByLabelText(/имя/i), newUser.firstName);
    await userEvent.type(screen.getByLabelText(/фамилия/i), newUser.lastName);
    await userEvent.type(
      screen.getByLabelText(/организация/i),
      newUser.organization
    );
    await userEvent.type(screen.getByLabelText(/логин/i), newUser.login);
    await userEvent.type(screen.getByLabelText(/пароль/i), newUser.password);

    userEvent.click(
      screen.getByRole("button", { name: /зарегестрироваться/i })
    );

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });
});
