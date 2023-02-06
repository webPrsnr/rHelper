import { render } from "@testing-library/react";
import { AppProvider } from "@/providers/app";
import { FunctionComponent } from "react";

export const providerRender = async (
  ui: any,
  { route = "/", ...renderOptions }: Record<string, any> = {}
) => {
  window.history.pushState({}, "Test page", route);

  const returnValue = {
    ...render(ui, {
      wrapper: AppProvider as FunctionComponent<unknown>,
      ...renderOptions,
    }),
  };

  return returnValue;
};
